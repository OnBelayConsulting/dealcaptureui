import {Component, DestroyRef, inject, input} from '@angular/core';
import {
    PricingLocationQuickSearchComponent
} from "../../pricing-locations/pricing-location-quick-search/pricing-location-quick-search.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {PriceIndexService} from '../../../services/price-index.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {PriceCurveSnapshot, PriceIndexSnapshot} from '../model/price.model';
import {PriceIndexQuickSearchComponent} from '../price-index-quick-search/price-index-quick-search.component';

@Component({
  selector: 'app-price-curve-edit',
  imports: [
    ReactiveFormsModule,
    PriceIndexQuickSearchComponent
  ],
  templateUrl: './price-curve-edit.component.html',
  styleUrl: './price-curve-edit.component.scss'
})
export class PriceCurveEditComponent {
  router = inject(Router);
  priceIndexService = inject(PriceIndexService);
  destroyRef = inject(DestroyRef);

  priceCurveId = input<number | undefined>(undefined);
  showIndexSearch: boolean = false;

  hasErrors = false;

  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: PriceCurveSnapshot = {
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

    hourEnding: new FormControl<number | undefined>(0, {
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
    if (this.priceCurveId()) {
      let subscriber = this.priceIndexService.findPriceCurveById(this.priceCurveId()!).subscribe( {
        next: priceCurveSnapshot => {
          if (priceCurveSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = priceCurveSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: priceCurveSnapshot.entityId!.id
            };

            this.myForm.controls.indexName.setValue(priceCurveSnapshot.indexId.code);

            this.myForm.controls.curveDate.setValue(priceCurveSnapshot.detail?.curveDate);

            if (priceCurveSnapshot.detail?.hourEnding)
              this.myForm.controls.hourEnding.setValue(priceCurveSnapshot.detail?.hourEnding!);

            this.myForm.controls.observedDateTime.setValue(priceCurveSnapshot.detail!.observedDateTime);
            this.myForm.controls.frequency.setValue(priceCurveSnapshot.detail!.frequencyCodeValue);

          } else {
            this.router.navigate(['priceCurves', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['priceCurves', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    }

  }


  onReset() {
    this.router.navigate(['priceIndices', 'list']);
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
      if (this.myForm.controls.hourEnding.invalid)
        this.formErrors.push("Missing or invalid hour ending. Default is 0 for daily and monthly.");
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
      if (this.myForm.controls.hourEnding.dirty) {
        if (this.myForm.controls.hourEnding.value)
          this.modifiedSnapshot!.detail!.hourEnding = this.myForm.controls.hourEnding.value;
        else
          this.modifiedSnapshot!.detail!.hourEnding = null;

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
    let subscription = this.priceIndexService.savePriceCurve(this.modifiedSnapshot!).subscribe({
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
