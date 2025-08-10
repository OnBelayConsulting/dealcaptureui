import {Component, DestroyRef, inject, input, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {PowerProfileService} from '../../../services/power-profile.service';
import {
  PowerProfileDaySnapshot,
  PowerProfileIndexMappingSnapshot,
  PowerProfileSnapshot
} from '../model/power-profile.model';
import {
  PriceIndexQuickSearchComponent
} from '../../pricing/price-index-quick-search/price-index-quick-search.component';

@Component({
  selector: 'app-power-profile-edit',
  imports: [
    ReactiveFormsModule,
    PriceIndexQuickSearchComponent
  ],
  templateUrl: './power-profile-edit.component.html',
  styleUrl: './power-profile-edit.component.scss'
})
export class PowerProfileEditComponent {
  router = inject(Router);
  powerProfileService = inject(PowerProfileService);
  destroyRef = inject(DestroyRef);
  formReady = signal<boolean>(false);

  powerProfileId = input<number | undefined>(undefined);

  showSettledPriceIndexSearch: boolean = false;
  showOnPeakPriceIndexSearch: boolean = false;
  showOffPeakSettledPriceIndexSearch: boolean = false;
  showSuperPeakSettledPriceIndexSearch: boolean = false;

  showHourFields = signal<boolean>(true);

  transactionResult: TransactionResult | undefined = undefined;

  hasErrors = false;

  formErrors : string[] = [];



  myForm = new FormGroup({

    selectedCode: new FormControl<string | undefined>('None', {
    }),
    hourRange: new FormControl<string | undefined>('None', {
    }),


    name: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl<string | undefined>(undefined, {
    }),
    settledPriceIndex: new FormControl<string | undefined>(undefined, {
    }),
    onPeakPriceIndex: new FormControl<string | undefined>(undefined, {
    }),
    offPeakPriceIndex: new FormControl<string | undefined>(undefined, {
    }),
    superPeakPriceIndex: new FormControl<string | undefined>(undefined, {
    }),


    hourFields : new FormArray([
      new FormGroup({
        monday: new FormControl<string>('None'),
        tuesday: new FormControl<string>('None'),
        wednesday: new FormControl<string>('None'),
        thursday: new FormControl<string>('None'),
        friday: new FormControl<string>('None'),
        saturday: new FormControl<string>('None'),
        sunday: new FormControl<string>('None')

      }),
    ]),

  });

  private daysMap = new Map<number, PowerProfileDaySnapshot>();

  private modifiedSnapshot: PowerProfileSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    settledPriceIndexId: {
      id: undefined,
      code: undefined
    },
    version: -1,
    detail: {
      name: undefined,
      description: undefined,
    },
    indexMappings : [],
    changedMappings : [],
    profileDays : [],
    changedProfileDays : []

  }



  ngOnInit(): void {
    this.buildHours();

    if (this.powerProfileId()) {
      let subscriber = this.powerProfileService.findPowerProfileById(this.powerProfileId()!).subscribe( {
        next: powerProfileSnapshot => {
          if (powerProfileSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = powerProfileSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: powerProfileSnapshot.entityId!.id
            };
            if (powerProfileSnapshot.settledPriceIndexId) {
              this.modifiedSnapshot.settledPriceIndexId = {
                id: powerProfileSnapshot.settledPriceIndexId.id,
                code: powerProfileSnapshot.settledPriceIndexId.code
              }
            }
            this.myForm.controls.name.setValue(powerProfileSnapshot.detail!.name!);

            if (powerProfileSnapshot.detail?.description)
              this.myForm.controls.description.setValue(powerProfileSnapshot.detail?.description!);
            this.populateHourFields(powerProfileSnapshot);
            this.populateIndexMappingFields(powerProfileSnapshot);

          } else {
            this.router.navigate(['powerProfiles', 'list']);

          }
          this.formReady.set(true);
        },
        error: err => {
          this.router.navigate(['powerProfiles', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    } else {
      this.formReady.set(true);
    }

  }

  private populateIndexMappingFields(snapshot : PowerProfileSnapshot) {
    for (let i=0; i < snapshot.indexMappings!.length; i++) {
      let mapping = snapshot.indexMappings?.at(i);
      switch (mapping!.detail.powerFlowCodeValue) {
        case  'OnPeak' :
          this.myForm.controls.onPeakPriceIndex.setValue(mapping!.priceIndexId.code);
          break;
        case  'OffPeak' :
          this.myForm.controls.offPeakPriceIndex.setValue(mapping!.priceIndexId.code);
          break;
        case  'SuperPeak' :
          this.myForm.controls.superPeakPriceIndex.setValue(mapping!.priceIndexId.code);
          break;
      }
    }
  }

  private buildHours() {
    for (let i=0 ; i < 24; i++) {
      this.myForm.controls.hourFields.push(
        new FormGroup({
          monday: new FormControl<string>('None'),
          tuesday: new FormControl<string>('None'),
          wednesday: new FormControl<string>('None'),
          thursday: new FormControl<string>('None'),
          friday: new FormControl<string>('None'),
          saturday: new FormControl<string>('None'),
          sunday: new FormControl<string>('None')

        }),
      )
    }
  }

  private populateHourFields(snapshot : PowerProfileSnapshot) {
    for (let i = 0; i <snapshot.profileDays!.length ; i++) {
      const profileDay = snapshot.profileDays?.at(i);
      const dayOfWeek = profileDay!.detail.dayOfWeek;

      for (let j = 0; j < 24 ; j++) {
        if (profileDay!.detail.hours[j]) {

          switch (dayOfWeek) {
            case 1 :
              this.myForm.controls.hourFields.at(j).controls.monday.setValue(profileDay!.detail.hours[j]);
              break;
            case 2 :
              this.myForm.controls.hourFields.at(j).controls.tuesday.setValue(profileDay!.detail.hours[j]);
              break;
            case 3 :
              this.myForm.controls.hourFields.at(j).controls.wednesday.setValue(profileDay!.detail.hours[j]);
              break;
            case 4 :
              this.myForm.controls.hourFields.at(j).controls.thursday.setValue(profileDay!.detail.hours[j]);
              break;
            case 5 :
              this.myForm.controls.hourFields.at(j).controls.friday.setValue(profileDay!.detail.hours[j]);
              break;
            case 6 :
              this.myForm.controls.hourFields.at(j).controls.saturday.setValue(profileDay!.detail.hours[j]);
              break;
            case 7 :
              this.myForm.controls.hourFields.at(j).controls.sunday.setValue(profileDay!.detail.hours[j]);
              break;
          }
        }
      }
    }
  }

  onReset() {
    this.router.navigate(['powerProfiles', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    this.formErrors = [];
    console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
      if (this.myForm.controls.name.invalid)
        this.formErrors.push("Missing Power Profile Name");
    } else {
      let wasModified = false;
      if (this.myForm.controls.name.dirty) {
        if (this.myForm.controls.name.value)
          this.modifiedSnapshot.detail!.name = this.myForm.controls.name.value;
        else
          this.modifiedSnapshot.detail!.name = undefined;
        wasModified = true;
      }

      if (this.myForm.controls.description.dirty) {
        if (this.myForm.controls.description.value)
          this.modifiedSnapshot!.detail!.description = this.myForm.controls.description.value;
        else
          this.modifiedSnapshot!.detail!.description = undefined;
          wasModified = true;
      }

      if (this.myForm.controls.settledPriceIndex.dirty) {
        if (this.myForm.controls.settledPriceIndex.value)
          this.modifiedSnapshot!.settledPriceIndexId = {
            id : null,
            code : this.myForm.controls.settledPriceIndex.value
          }
        else
          this.modifiedSnapshot!.settledPriceIndexId = {
            id : null,
            code : null
          }
        wasModified = true;
      }

      if (this.myForm.controls.onPeakPriceIndex.dirty) {
        wasModified = true;
        this.populateOnPeakIndexMappingInSnapshot();
      }

      if (this.myForm.controls.offPeakPriceIndex.dirty) {
        wasModified = true;
        this.populateOffPeakIndexMappingInSnapshot();
      }

      if (this.myForm.controls.superPeakPriceIndex.dirty) {
        wasModified = true;
        this.populateSuperPeakIndexMappingInSnapshot();
      }

      if (this.myForm.controls.hourFields.dirty) {
        wasModified = true;
        this.populatePowerProfileDays();
      }
      this.submitPowerProfile(wasModified);
    }
  }

  private populateOnPeakIndexMappingInSnapshot() {
      if (this.myForm.controls.onPeakPriceIndex.value) {
        let indexMapping: PowerProfileIndexMappingSnapshot = {
          priceIndexId: {
            code: this.myForm.controls.onPeakPriceIndex.value,
            id: null
          },
          detail: {
            powerFlowCodeValue: 'OnPeak'
          }
        }
        this.modifiedSnapshot.changedMappings!.push(indexMapping);
      }
  }

  private populateOffPeakIndexMappingInSnapshot() {
    if (this.myForm.controls.offPeakPriceIndex.value) {
      let indexMapping: PowerProfileIndexMappingSnapshot = {
        priceIndexId: {
          code: this.myForm.controls.offPeakPriceIndex.value,
          id: null
        },
        detail: {
          powerFlowCodeValue: 'OffPeak'
        }
      }
      this.modifiedSnapshot.changedMappings!.push(indexMapping);
    }
  }

  private populateSuperPeakIndexMappingInSnapshot() {
    if (this.myForm.controls.superPeakPriceIndex.value) {
      let indexMapping: PowerProfileIndexMappingSnapshot = {
        priceIndexId: {
          code: this.myForm.controls.superPeakPriceIndex.value,
          id: null
        },
        detail: {
          powerFlowCodeValue: 'SuperPeak'
        }
      }
      this.modifiedSnapshot.changedMappings!.push(indexMapping);
    }
  }

  private populatePowerProfileDays( ) {
    this.daysMap = this.populatePowerProfileDayMap();
    for (let c of this.daysMap.values()) {
      this.modifiedSnapshot.changedProfileDays!.push(c);
    }
  }

  private populatePowerProfileDayMap() {
      let powerProfileDayMap = new Map<number, PowerProfileDaySnapshot>();
      for (let j = 0; j < 24 ; j++) {
        //Monday (1)
        if (this.myForm.controls.hourFields.at(j).controls.monday.dirty) {
          if (!powerProfileDayMap.has(1)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 1,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(1, day);
          }
          let powerProfileDay = powerProfileDayMap.get(1);
          if (this.myForm.controls.hourFields.at(j).controls.monday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.monday.value!;
        }
        //Tuesday (2)
        if (this.myForm.controls.hourFields.at(j).controls.tuesday.dirty) {
          if (!powerProfileDayMap.has(2)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 2,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(2, day);
          }
          let powerProfileDay = powerProfileDayMap.get(2);
          if (this.myForm.controls.hourFields.at(j).controls.tuesday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.tuesday.value!;
        }
        //Wednesday (3)
        if (this.myForm.controls.hourFields.at(j).controls.wednesday.dirty) {
          if (!powerProfileDayMap.has(3)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 3,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(3, day);
          }
          let powerProfileDay = powerProfileDayMap.get(3);
          if (this.myForm.controls.hourFields.at(j).controls.wednesday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.wednesday.value!;
        }
        // Thursday (4)
        if (this.myForm.controls.hourFields.at(j).controls.thursday.dirty) {
          if (!powerProfileDayMap.has(4)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 4,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(4, day);
          }
          let powerProfileDay = powerProfileDayMap.get(4);
          if (this.myForm.controls.hourFields.at(j).controls.thursday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.thursday.value!;
        }
        //Friday (5)
        if (this.myForm.controls.hourFields.at(j).controls.friday.dirty) {
          if (!powerProfileDayMap.has(5)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 5,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(5, day);
          }
          let powerProfileDay = powerProfileDayMap.get(5);
          if (this.myForm.controls.hourFields.at(j).controls.friday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.friday.value!;
        }
        //Saturday (6)
        if (this.myForm.controls.hourFields.at(j).controls.saturday.dirty) {
          if (!powerProfileDayMap.has(6)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 6,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(6, day);
          }
          let powerProfileDay = powerProfileDayMap.get(6);
          if (this.myForm.controls.hourFields.at(j).controls.saturday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.saturday.value!;
        }
        //Sunday (7)
        if (this.myForm.controls.hourFields.at(j).controls.sunday.dirty) {
          if (!powerProfileDayMap.has(7)) {
            let day : PowerProfileDaySnapshot = {
              detail : {
                dayOfWeek: 7,
                hours: []
              }
            }
            for (let k = 0; k < 24; k++) {
              day.detail.hours[k] = 'None';
            }
            powerProfileDayMap.set(7, day);
          }
          let powerProfileDay = powerProfileDayMap.get(7);
          if (this.myForm.controls.hourFields.at(j).controls.sunday.value)
            powerProfileDay!.detail.hours[j] = this.myForm.controls.hourFields.at(j).controls.sunday.value!;
        }

      }
      return powerProfileDayMap;
  }


  private submitPowerProfile(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.powerProfileService.savePowerProfile(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

  onShowHourFields() {
    this.showHourFields.set(true);
  }

  onCloseHourFields() {
    this.showHourFields.set(false);
  }

  searchForSettledPriceIndex() {
    this.showSettledPriceIndexSearch = true;
  }

  searchForOnPeakIndex() {
    this.showOnPeakPriceIndexSearch = true;
  }

  searchForOffPeakIndex() {
    this.showOffPeakSettledPriceIndexSearch = true;
  }

  searchForSuperPeakIndex() {
    this.showSuperPeakSettledPriceIndexSearch = true;
  }


  onCancelSettledPriceIndexSearch() {
    this.showSettledPriceIndexSearch = false;
  }

  onCancelOnPeakIndexSearch() {
    this.showOnPeakPriceIndexSearch = false;
  }

  onCancelOffPeakIndexSearch() {
    this.showOffPeakSettledPriceIndexSearch = false;
  }

  onCancelSuperPeakIndexSearch() {
    this.showSuperPeakSettledPriceIndexSearch = false;
  }


  updateSettledPriceIndex(name: string) {
    this.myForm.controls.settledPriceIndex.setValue(name);
    this.myForm.controls.settledPriceIndex.markAsDirty();
    this.showSettledPriceIndexSearch = false;
  }

  updateOnPeakIndex(name: string) {
    this.myForm.controls.onPeakPriceIndex.setValue(name);
    this.myForm.controls.onPeakPriceIndex.markAsDirty();
    this.showOnPeakPriceIndexSearch = false;
  }

  updateOffPeakIndex(name: string) {
    this.myForm.controls.offPeakPriceIndex.setValue(name);
    this.myForm.controls.offPeakPriceIndex.markAsDirty();
    this.showOffPeakSettledPriceIndexSearch = false;
  }

  updateSuperPeakIndex(name: string) {
    this.myForm.controls.superPeakPriceIndex.setValue(name);
    this.myForm.controls.superPeakPriceIndex.markAsDirty();
    this.showSuperPeakSettledPriceIndexSearch = false;
  }

  onPreset() {
    if (this.myForm.controls.selectedCode.value && this.myForm.controls.hourRange.value) {
      if (this.myForm.controls.hourRange.value === 'None')
        return;
      this.myForm.controls.hourFields.markAsDirty();

      let code = this.myForm.controls.selectedCode.value!;
      let range = this.myForm.controls.hourRange.value!;

      for (let i = 0; i < 24; i++) {
        if (range === 'All' || range === 'AllWeekDays') {
          this.myForm.controls.hourFields.at(i).controls.monday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.tuesday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.wednesday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.thursday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.friday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.monday.markAsDirty();
          this.myForm.controls.hourFields.at(i).controls.tuesday.markAsDirty();
          this.myForm.controls.hourFields.at(i).controls.wednesday.markAsDirty();
          this.myForm.controls.hourFields.at(i).controls.thursday.markAsDirty();
          this.myForm.controls.hourFields.at(i).controls.friday.markAsDirty();
        }
        if (range === 'All' || range === 'AllWeekends') {
          this.myForm.controls.hourFields.at(i).controls.saturday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.sunday.setValue(code);
          this.myForm.controls.hourFields.at(i).controls.saturday.markAsDirty();
          this.myForm.controls.hourFields.at(i).controls.sunday.markAsDirty();
        }
      }
    }
  }
}
