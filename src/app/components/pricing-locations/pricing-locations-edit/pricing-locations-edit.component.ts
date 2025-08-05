import {Component, DestroyRef, inject, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {PricingLocationService} from '../../../services/pricing-location.service';
import {PricingLocationSnapshot} from '../model/pricing-location.model';

@Component({
  selector: 'app-pricing-locations-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './pricing-locations-edit.component.html',
  styleUrl: './pricing-locations-edit.component.scss'
})
export class PricingLocationsEditComponent {
  router = inject(Router);
  pricingLocationService = inject(PricingLocationService);
  destroyRef = inject(DestroyRef);

  pricingLocationId = input<number>(-1);

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: PricingLocationSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    version: -1,
    detail: {
      name: undefined,
      description: undefined,
      countryCode: undefined,
      stateProvinceCode: undefined,
    }
  }


  myForm = new FormGroup({

    name: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl<string | undefined>(undefined, {
    }),
    countryCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    stateProvinceCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

  });

  ngOnInit(): void {
    if (this.pricingLocationId && this.pricingLocationId() > 0) {
      let subscriber = this.pricingLocationService.findPricingLocationById(this.pricingLocationId()).subscribe( {
        next: pricingLocationSnapshot => {
          if (pricingLocationSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = pricingLocationSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: pricingLocationSnapshot.entityId!.id
            };

            this.myForm.controls.name.setValue(pricingLocationSnapshot.detail!.name!);

            if (pricingLocationSnapshot.detail?.description)
              this.myForm.controls.description.setValue(pricingLocationSnapshot.detail?.description!);

            this.myForm.controls.countryCode.setValue(pricingLocationSnapshot.detail?.countryCode);
            this.myForm.controls.stateProvinceCode.setValue(pricingLocationSnapshot.detail!.stateProvinceCode);

          } else {
            this.router.navigate(['pricingLocations', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['pricingLocations', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    }

  }


  onReset() {
    this.router.navigate(['pricingLocations', 'list']);
  }


  onSubmit() {
    console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log("invalid form");
    } else {
      let wasModified = false;
      if (this.myForm.controls.name.dirty) {
        if (this.myForm.controls.name.value)
          this.modifiedSnapshot.detail!.name = this.myForm.controls.name.value;
        else
          this.modifiedSnapshot.detail!.name = null;
        wasModified = true;
      }
      if (this.myForm.controls.description.dirty) {
        if (this.myForm.controls.description.value)
          this.modifiedSnapshot!.detail!.description = this.myForm.controls.description.value;
        else
          this.modifiedSnapshot!.detail!.description = null;

        wasModified = true;
      }
      if (this.myForm.controls.countryCode.dirty && this.myForm.controls.countryCode.value != null) {
        this.modifiedSnapshot!.detail!.countryCode = this.myForm.controls.countryCode.value;
        wasModified = true;
      }
      if (this.myForm.controls.stateProvinceCode.dirty && this.myForm.controls.stateProvinceCode.value != null) {
        this.modifiedSnapshot!.detail!.stateProvinceCode = this.myForm.controls.stateProvinceCode.value;
        wasModified = true;
      }
      this.submitPricingLocation(wasModified);
    }
  }

  private submitPricingLocation(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.pricingLocationService.savePricingLocation(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


}
