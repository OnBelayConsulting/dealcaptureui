import {Component, DestroyRef, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {PriceIndexService} from '../../../services/price-index.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {PriceIndexSnapshot} from '../model/price.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrganizationQuickSearchComponent} from '../../organizations/organization-quick-search/organization-quick-search.component';
import {
  PricingLocationQuickSearchComponent
} from '../../pricing-locations/pricing-location-quick-search/pricing-location-quick-search.component';
import {PriceIndexQuickSearchComponent} from '../price-index-quick-search/price-index-quick-search.component';

@Component({
  selector: 'app-price-index-edit',
  imports: [
    ReactiveFormsModule,
    PricingLocationQuickSearchComponent,
    PriceIndexQuickSearchComponent
  ],
  templateUrl: './price-index-edit.component.html',
  styleUrl: './price-index-edit.component.scss'
})
export class PriceIndexEditComponent {
  router = inject(Router);
  priceIndexService = inject(PriceIndexService);
  destroyRef = inject(DestroyRef);

  priceIndexId = input<number | undefined>(undefined);
  showLocationSearch: boolean = false;
  showBenchIndexSearch: boolean = false;
  showBaseIndexSearch: boolean = false;

  hasErrors = false;
  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  private modifiedSnapshot: PriceIndexSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    pricingLocationId: {
      id: undefined,
      code: undefined
    },
    benchIndexId: {
      id: undefined,
      code: undefined
    },
    baseIndexId: {
      id: undefined,
      code: undefined
    },
    version: -1,
    detail: {
      name: undefined,
      description: undefined,
      indexTypeValue: undefined,
      currencyCodeValue: undefined,
      unitOfMeasureCodeValue: undefined,
      frequencyCodeValue: undefined,
      benchSettlementRuleCodeValue: undefined
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
    location: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    indexTypeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    benchIndex: new FormControl<string | undefined>(undefined, {
    }),
    baseIndex: new FormControl<string | undefined>(undefined, {
    }),
    currencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    unitOfMeasureCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    frequencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    benchmarkSettlementRuleCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })


  });

  ngOnInit(): void {
    if (this.priceIndexId()) {
      let subscriber = this.priceIndexService.findPriceIndexById(this.priceIndexId()!).subscribe( {
        next: priceIndexSnapshot => {
          if (priceIndexSnapshot) {
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = priceIndexSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: priceIndexSnapshot.entityId!.id
            };

            this.myForm.controls.name.setValue(priceIndexSnapshot.detail!.name!);
            this.myForm.controls.indexTypeValue.setValue(priceIndexSnapshot.detail!.indexTypeValue!);

            if (priceIndexSnapshot.detail?.description)
              this.myForm.controls.description.setValue(priceIndexSnapshot.detail?.description!);

            if (priceIndexSnapshot.baseIndexId) {
              this.myForm.controls.baseIndex.setValue(priceIndexSnapshot.baseIndexId.code);
            }

            if (priceIndexSnapshot.benchIndexId) {
              this.myForm.controls.benchIndex.setValue(priceIndexSnapshot.benchIndexId.code);
            }

            this.myForm.controls.location.setValue(priceIndexSnapshot.pricingLocationId.code);
            this.myForm.controls.currencyCodeValue.setValue(priceIndexSnapshot.detail!.currencyCodeValue);
            this.myForm.controls.unitOfMeasureCodeValue.setValue(priceIndexSnapshot.detail!.unitOfMeasureCodeValue);
            this.myForm.controls.frequencyCodeValue.setValue(priceIndexSnapshot.detail!.frequencyCodeValue);
            this.myForm.controls.benchmarkSettlementRuleCodeValue.setValue(priceIndexSnapshot.detail!.benchSettlementRuleCodeValue);

          } else {
            this.router.navigate(['priceIndices', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['priceIndices', 'list']);
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
      console.log("invalid form");
      this.hasErrors = true;
      if (this.myForm.controls.name.invalid)
        this.formErrors.push("Missing Name")
      if (this.myForm.controls.location.invalid)
        this.formErrors.push("Missing Location")
      if (this.myForm.controls.indexTypeValue.invalid)
        this.formErrors.push("Missing Index Type")
      if (this.myForm.controls.currencyCodeValue.invalid)
        this.formErrors.push("Missing Currency")
      if (this.myForm.controls.unitOfMeasureCodeValue.invalid)
        this.formErrors.push("Missing unit of measure")

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
      if (this.myForm.controls.indexTypeValue.dirty) {
        if (this.myForm.controls.indexTypeValue.value)
          this.modifiedSnapshot!.detail!.indexTypeValue = this.myForm.controls.indexTypeValue.value;
        else
          this.modifiedSnapshot!.detail!.indexTypeValue = null;

        wasModified = true;
      }

      if (this.myForm.controls.baseIndex.dirty) {
        if (this.myForm.controls.baseIndex.value) {
          this.modifiedSnapshot.baseIndexId = {
            id : null,
            code : this.myForm.controls.baseIndex.value
          }
        } else {
          this.modifiedSnapshot.baseIndexId = {
            id : null,
            code : null
          }

        }
      }

      if (this.myForm.controls.benchIndex.dirty) {
        if (this.myForm.controls.benchIndex.value) {
          this.modifiedSnapshot.benchIndexId = {
            id : null,
            code : this.myForm.controls.benchIndex.value
          }
        } else {
          this.modifiedSnapshot.benchIndexId = {
            id : null,
            code : null
          }

        }
      }
      if (this.myForm.controls.location.dirty && this.myForm.controls.location.value != null) {
        this.modifiedSnapshot!.pricingLocationId = {
          code: this.myForm.controls.location.value
        };
        wasModified = true;
      }
      if (this.myForm.controls.currencyCodeValue.dirty) {
        if (this.myForm.controls.currencyCodeValue.value)
          this.modifiedSnapshot!.detail!.currencyCodeValue = this.myForm.controls.currencyCodeValue.value;
        else
          this.modifiedSnapshot.detail!.currencyCodeValue = null;
        wasModified = true;
      }
      if (this.myForm.controls.unitOfMeasureCodeValue.dirty && this.myForm.controls.unitOfMeasureCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.unitOfMeasureCodeValue = this.myForm.controls.unitOfMeasureCodeValue.value;
        wasModified = true;
      }
     if (this.myForm.controls.frequencyCodeValue.dirty && this.myForm.controls.frequencyCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.frequencyCodeValue = this.myForm.controls.frequencyCodeValue.value;
       wasModified = true;
     }
      if (this.myForm.controls.benchmarkSettlementRuleCodeValue.dirty && this.myForm.controls.benchmarkSettlementRuleCodeValue.value != null) {
        this.modifiedSnapshot!.detail!.benchSettlementRuleCodeValue = this.myForm.controls.benchmarkSettlementRuleCodeValue.value;
        wasModified = true;
      }
     this.submitPriceIndex(wasModified);
   }
  }

  private submitPriceIndex(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.priceIndexService.savePriceIndex(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

  searchForLocation() {
    this.showLocationSearch = true;
  }


  onCancelLocationSearch() {
    this.showLocationSearch = false;
  }


  updateLocation(name: string) {
    this.myForm.controls.location.setValue(name);
    this.myForm.controls.location.markAsDirty();
    this.showLocationSearch = false;
  }


  // Benchmark
  searchForBenchIndex() {
    this.showBenchIndexSearch = true;
  }


  onCancelBenchIndexSearch() {
    this.showBenchIndexSearch = false;
  }


  updateBenchIndex(name: string) {
    this.myForm.controls.benchIndex.setValue(name);
    this.myForm.controls.benchIndex.markAsDirty();
    this.showBenchIndexSearch = false;
  }


  // Base
  searchForBaseIndex() {
    this.showBaseIndexSearch = true;
  }


  onCancelBaseIndexSearch() {
    this.showBaseIndexSearch = false;
  }


  updateBaseIndex(name: string) {
    this.myForm.controls.baseIndex.setValue(name);
    this.myForm.controls.baseIndex.markAsDirty();
    this.showBaseIndexSearch = false;
  }

}
