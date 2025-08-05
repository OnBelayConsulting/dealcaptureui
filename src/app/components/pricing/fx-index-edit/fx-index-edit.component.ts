import {Component, DestroyRef, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {FxIndexService} from '../../../services/fx-index.service';
import {FxIndexSnapshot} from '../model/fx.model';

@Component({
  selector: 'app-fx-index-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './fx-index-edit.component.html',
  styleUrl: './fx-index-edit.component.scss'
})
export class FxIndexEditComponent {
  router = inject(Router);
  fxIndexService = inject(FxIndexService);
  destroyRef = inject(DestroyRef);

  fxIndexId = input<number | undefined>(undefined);

  hasErrors = false;
  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: FxIndexSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    version: -1,
    detail: {
      name: undefined,
      description: undefined,
      fromCurrencyCodeValue: undefined,
      toCurrencyCodeValue: undefined,
      frequencyCodeValue: undefined,
      daysOffsetForExpiry: undefined
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
    fromCurrencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    toCurrencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    frequencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    daysToExpiry: new FormControl<number | undefined>(0, {
      validators: [
        Validators.required,
      ],
    })


  });

  ngOnInit(): void {
    if (this.fxIndexId()) {
      let subscriber = this.fxIndexService.findFxIndexById(this.fxIndexId()!).subscribe( {
        next: fxIndexSnapshot => {
          if (fxIndexSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = fxIndexSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: fxIndexSnapshot.entityId!.id
            };

            this.myForm.controls.name.setValue(fxIndexSnapshot.detail!.name!);

            if (fxIndexSnapshot.detail?.description)
              this.myForm.controls.description.setValue(fxIndexSnapshot.detail?.description!);
            this.myForm.controls.fromCurrencyCodeValue.setValue(fxIndexSnapshot.detail!.fromCurrencyCodeValue);
            this.myForm.controls.toCurrencyCodeValue.setValue(fxIndexSnapshot.detail!.toCurrencyCodeValue);
            this.myForm.controls.frequencyCodeValue.setValue(fxIndexSnapshot.detail!.frequencyCodeValue);
            this.myForm.controls.daysToExpiry.setValue(fxIndexSnapshot.detail!.daysOffsetForExpiry);

          } else {
            this.router.navigate(['fxIndices', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['fxIndices', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    }

  }


  onReset() {
    this.router.navigate(['fxIndices', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
      if (this.myForm.controls.name.invalid)
        this.formErrors.push("Missing Name")
      if (this.myForm.controls.fromCurrencyCodeValue.invalid)
        this.formErrors.push("Missing From Currency")
      if (this.myForm.controls.toCurrencyCodeValue.invalid)
        this.formErrors.push("Missing To Currency")
      if (this.myForm.controls.fromCurrencyCodeValue.invalid)
        this.formErrors.push("Missing frequency")
      if (this.myForm.controls.daysToExpiry.invalid)
        this.formErrors.push("Missing days offset to expiry")

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

      if (this.myForm.controls.fromCurrencyCodeValue.dirty) {
        if (this.myForm.controls.fromCurrencyCodeValue.value)
          this.modifiedSnapshot!.detail!.fromCurrencyCodeValue = this.myForm.controls.fromCurrencyCodeValue.value;
        else
          this.modifiedSnapshot.detail!.fromCurrencyCodeValue = null;
        wasModified = true;
      }
      if (this.myForm.controls.toCurrencyCodeValue.dirty && this.myForm.controls.toCurrencyCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.toCurrencyCodeValue = this.myForm.controls.toCurrencyCodeValue.value;
        wasModified = true;
      }
      if (this.myForm.controls.frequencyCodeValue.dirty && this.myForm.controls.frequencyCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.frequencyCodeValue = this.myForm.controls.frequencyCodeValue.value;
        wasModified = true;
      }
      if (this.myForm.controls.daysToExpiry.dirty && this.myForm.controls.daysToExpiry.value != null) {
        this.modifiedSnapshot!.detail!.daysOffsetForExpiry = this.myForm.controls.daysToExpiry.value;
        wasModified = true;
      }
      this.submitFxIndex(wasModified);
    }
  }

  private submitFxIndex(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.fxIndexService.saveFxIndex(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }
}
