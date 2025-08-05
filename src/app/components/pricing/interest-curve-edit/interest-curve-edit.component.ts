import {Component, DestroyRef, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {InterestIndexService} from '../../../services/interest-rate-index.service';
import {InterestCurveSnapshot} from '../model/interest-rate.model';
import {InterestIndexQuickSearchComponent} from '../interest-index-quick-search/interest-index-quick-search.component';

@Component({
  selector: 'app-interest-curve-edit',
    imports: [
      ReactiveFormsModule,
      InterestIndexQuickSearchComponent
    ],
  templateUrl: './interest-curve-edit.component.html',
  styleUrl: './interest-curve-edit.component.scss'
})
export class InterestCurveEditComponent {
  router = inject(Router);
  interestIndexService = inject(InterestIndexService);
  destroyRef = inject(DestroyRef);

  interestCurveId = input<number | undefined>(undefined);
  showIndexSearch: boolean = false;

  hasErrors = false;

  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: InterestCurveSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    indexId: {
      id: undefined,
      code: undefined
    },
    version: -1,
    detail: {
      frequencyCodeValue: undefined,
      curveDate: undefined,
      hourEnding: undefined,
      observedDateTime: undefined,
      curveValue: undefined,
    }
  }


  myForm = new FormGroup({

    indexName: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    frequency: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    curveDate: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    observedDateTime: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    curveValue: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })


  });

  ngOnInit(): void {
    if (this.interestCurveId()) {
      let subscriber = this.interestIndexService.findInterestCurveById(this.interestCurveId()!).subscribe( {
        next: interestCurveSnapshot => {
          if (interestCurveSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = interestCurveSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: interestCurveSnapshot.entityId!.id
            };

            this.myForm.controls.indexName.setValue(interestCurveSnapshot.indexId.code);

            this.myForm.controls.curveDate.setValue(interestCurveSnapshot.detail?.curveDate);

            this.myForm.controls.observedDateTime.setValue(interestCurveSnapshot.detail!.observedDateTime);
            this.myForm.controls.frequency.setValue(interestCurveSnapshot.detail!.frequencyCodeValue);

          } else {
            this.router.navigate(['interestCurves', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['interestCurves', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    }

  }


  onReset() {
    this.router.navigate(['interestCurves', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    console.log(this.myForm);
    if (this.myForm.invalid) {
      this.hasErrors = true;
      console.log("invalid form");
      if (this.myForm.controls.indexName.invalid)
        this.formErrors.push("Missing index name");
      if (this.myForm.controls.frequency.invalid)
        this.formErrors.push("Missing frequency");
      if (this.myForm.controls.curveDate.invalid)
        this.formErrors.push("Missing curve date");
      if (this.myForm.controls.observedDateTime.invalid)
        this.formErrors.push("Missing observed date/time");
      if (this.myForm.controls.curveValue.invalid)
        this.formErrors.push("Missing or invalid price value.");

    } else {
      let wasModified = false;
      if (this.myForm.controls.curveDate.dirty) {
        if (this.myForm.controls.curveDate.value)
          this.modifiedSnapshot.detail!.curveDate = this.myForm.controls.curveDate.value;
        else
          this.modifiedSnapshot.detail!.curveDate = null;
        wasModified = true;
      }
      if (this.myForm.controls.indexName.dirty) {
        if (this.myForm.controls.indexName.value)
          this.modifiedSnapshot.indexId = {
            code: this.myForm.controls.indexName.value
          };
        else
          this.modifiedSnapshot.indexId = {
            code: null,
            id: null
          };
        wasModified = true;
      }
      if (this.myForm.controls.observedDateTime.dirty) {
        if (this.myForm.controls.observedDateTime.value)
          this.modifiedSnapshot!.detail!.observedDateTime = this.myForm.controls.observedDateTime.value;
        else
          this.modifiedSnapshot!.detail!.observedDateTime = null;

        wasModified = true;
      }
      if (this.myForm.controls.frequency.dirty) {
        if (this.myForm.controls.frequency.value)
          this.modifiedSnapshot!.detail!.frequencyCodeValue = this.myForm.controls.frequency.value;
        else
          this.modifiedSnapshot.detail!.frequencyCodeValue = null;
        wasModified = true;
      }
      if (this.myForm.controls.curveValue.dirty && this.myForm.controls.curveValue.value != null) {
        this.modifiedSnapshot!.detail!.curveValue = this.myForm.controls.curveValue.value;
        wasModified = true;
      }
      this.submitPrice(wasModified);
    }
  }

  private submitPrice(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.interestIndexService.saveInterestCurve(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

  searchForIndex() {
    this.showIndexSearch = true;
  }


  onCancelIndexSearch() {
    this.showIndexSearch = false;
  }


  updateIndex(name: string) {
    this.myForm.controls.indexName.setValue(name);
    this.myForm.controls.indexName.markAsDirty();
    this.showIndexSearch = false;
  }




}
