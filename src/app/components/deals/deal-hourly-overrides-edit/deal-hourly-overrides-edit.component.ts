import {Component, DestroyRef, inject, input, signal} from '@angular/core';
import {DealOverrideHoursForDaySnapshot, DealOverrideHourSnapshot} from '../model/deal-overrides.model';
import {Router} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-deal-hourly-overrides-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './deal-hourly-overrides-edit.component.html',
  styleUrl: './deal-hourly-overrides-edit.component.scss'
})
export class DealHourlyOverridesEditComponent {
  router = inject(Router);
  dealService = inject(DealService);
  destroyRef = inject(DestroyRef);

  dealId = input.required<number>();

  dayDate = input.required<string>();

  formReady = signal<boolean>(false);

  overrideSnapshot : DealOverrideHoursForDaySnapshot | null = null;


  transactionResult: TransactionResult | undefined = undefined;

  hasErrors = false;

  formErrors : string[] = [];
  myForm = new FormGroup({
    dayDate: new FormControl<string | undefined>(undefined),

    hours: new FormArray([
      new FormGroup({
        hourEnding: new FormControl<number | null>(null),
        overrideValues: new FormArray([
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null)
        ])
      })
    ])
  });

  ngOnInit(): void {
    let subscription  =this.dealService.getHourlyDealOverrides(this.dealId(), this.dayDate()).subscribe({
      next: (data) => {
        this.overrideSnapshot = data;
        this.buildForm();
        this.formReady.set(true);
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }
  private buildForm() {

    if (this.overrideSnapshot) {
      let override = this.overrideSnapshot.overrideHours[0];

      this.myForm.controls.hours.at(0).controls.hourEnding.setValue(override.hourEnding);
      for (let j=0; j < this.overrideSnapshot.headings!.length; j++) {
        this.myForm.controls.hours.at(0).controls.overrideValues.at(j).setValue(override.values[j]);
      }
      this.buildHourOverrides(this.overrideSnapshot.overrideHours);
    }
  }

  private buildHourOverrides(overrides : DealOverrideHourSnapshot[]) {
    for (let i = 1; i < overrides.length; i++) {
      let override = overrides[i];
      this.myForm.controls.hours.push(
        new FormGroup({
          hourEnding: new FormControl<number | null>(override.hourEnding),
          overrideValues: new FormArray([
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null)
          ])
        })
      );
      for ( let k = 0; k < override.values.length; k++) {
        this.myForm.controls.hours.at(i).controls.overrideValues.at(k).setValue(override.values[k]);
      }
    }

  }

  onReset() {
    this.router.navigate(['deals', this.dealId(),'overrides','list']);
  }

  onSubmit() {
    this.hasErrors = false;
    this.formErrors = [];
    console.log(this.myForm);
    let wasModified = false;
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
    } else {
      wasModified = this.populateSnapshot()
    }
    if (wasModified)
      this.submitOverrides()
  }

  private populateSnapshot() {
    let wasModified = false;
    for (let i=0; i< this.overrideSnapshot!.overrideHours.length; i++) {
      for (let j=0; j <this.overrideSnapshot!.headings!.length; j++) {
        if (this.myForm.controls.hours.at(i).controls.overrideValues.at(j).dirty) {
          wasModified = true;
          if (this.myForm.controls.hours.at(i).controls.overrideValues.at(j).value)
            this.overrideSnapshot!.overrideHours[i].values[j] = this.myForm.controls.hours.at(i).controls.overrideValues.at(j).value!;
          else
            this.overrideSnapshot!.overrideHours[i].values[j] = null;
        }
      }
    }
    return wasModified;
  }


  private submitOverrides() {
    this.overrideSnapshot!.entityState = 'MODIFIED';

    let subscription = this.dealService.saveHourlyDealOverrides(this.overrideSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());


  }

  onCancel() {
    this.onReset();
  }

}
