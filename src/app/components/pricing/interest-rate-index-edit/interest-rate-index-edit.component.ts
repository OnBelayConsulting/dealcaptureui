import {Component, DestroyRef, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InterestIndexService} from '../../../services/interest-rate-index.service';
import {InterestIndexSnapshot} from '../model/interest-rate.model';

@Component({
  selector: 'app-interest-rate-index-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './interest-rate-index-edit.component.html',
  styleUrl: './interest-rate-index-edit.component.scss'
})
export class InterestRateIndexEditComponent {
  router = inject(Router);
  interestIndexService = inject(InterestIndexService);
  destroyRef = inject(DestroyRef);

  interestIndexId = input<number | undefined>(undefined);

  hasErrors = false;
  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: InterestIndexSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    version: -1,
    detail: {
      name: undefined,
      description: undefined,
      frequencyCodeValue: undefined,
      isRiskFreeRate: undefined
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
    frequencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    isRiskFreeRate: new FormControl<boolean | undefined>(false, {
      validators: [
        Validators.required,
      ],
    })


  });

  ngOnInit(): void {
    if (this.interestIndexId()) {
      let subscriber = this.interestIndexService.findInterestIndexById(this.interestIndexId()!).subscribe( {
        next: interestIndexSnapshot => {
          if (interestIndexSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = interestIndexSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: interestIndexSnapshot.entityId!.id
            };

            this.myForm.controls.name.setValue(interestIndexSnapshot.detail!.name!);

            if (interestIndexSnapshot.detail?.description)
              this.myForm.controls.description.setValue(interestIndexSnapshot.detail?.description!);
            this.myForm.controls.frequencyCodeValue.setValue(interestIndexSnapshot.detail!.frequencyCodeValue);
            this.myForm.controls.isRiskFreeRate.setValue(interestIndexSnapshot.detail!.isRiskFreeRate!);

          } else {
            this.router.navigate(['interestIndices', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['interestIndices', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    }

  }


  onReset() {
    this.router.navigate(['interestIndices', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
      if (this.myForm.controls.name.invalid)
        this.formErrors.push("Missing Name")
      if (this.myForm.controls.isRiskFreeRate.invalid)
        this.formErrors.push("Missing is Risk Free Rate")

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

      if (this.myForm.controls.frequencyCodeValue.dirty && this.myForm.controls.frequencyCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.frequencyCodeValue = this.myForm.controls.frequencyCodeValue.value;
        wasModified = true;
      }
      if (this.myForm.controls.isRiskFreeRate.dirty && this.myForm.controls.isRiskFreeRate.value != null) {
        this.modifiedSnapshot!.detail!.isRiskFreeRate = this.myForm.controls.isRiskFreeRate.value;
        wasModified = true;
      }
      this.submitInterestIndex(wasModified);
    }
  }

  private submitInterestIndex(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.interestIndexService.saveInterestIndex(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

}
