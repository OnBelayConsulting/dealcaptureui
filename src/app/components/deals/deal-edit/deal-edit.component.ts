import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DealSnapshot} from '../model/deal.model';
import {DealService} from '../services/deal.service';
import {TransactionResult} from '../../../models/transactionresult.model';
@Component({
  selector: 'app-deal-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './deal-edit.component.html',
  styleUrl: './deal-edit.component.scss'
})
export class DealEditComponent implements OnInit {
  router = inject(Router);
  dealService = inject(DealService);
  destroyRef = inject(DestroyRef);

  showCompanySearch: boolean = false;
  showCounterpartySearch: boolean = false;

  transactionResult: TransactionResult | undefined = undefined;
  hasErrors = false;

  formErrors : string[] = [];

  dealId = input<number>();

  dealSnapshot: DealSnapshot | null = null;

  myForm = new FormGroup({

    ticketNo: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    commodity: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    dealStatus: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    company: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    counterparty: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    buySellCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    startDate: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    endDate: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    volumeQuantity: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    volumeUoM: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    volumeFrequency: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    settlementCurrency: new FormControl<string | undefined>(undefined, {
    }),

    reportingCurrency: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    physicalDealPricing: new FormGroup({

      dealPrice : new FormControl<number | undefined>(undefined, {
        }),

      dealPriceCurrency : new FormControl<string | undefined>(undefined, {
      }),
      dealPriceUoM : new FormControl<string | undefined>(undefined, {

      }),
      dealIndex : new FormControl<string | undefined>(undefined, {
     }),
      marketIndex : new FormControl<string | undefined>(undefined, {
        validators: [
          Validators.required,
        ],
      })
    })

});

  ngOnInit(): void {
    if (this.dealId()) {
      let subscription = this.dealService.findDealById(this.dealId()!).subscribe({
        next: (data) => {
          this.dealSnapshot = data;
          this.populateForm();
        },
        error: err => {console.error(err)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());
    } else {
      this.dealSnapshot = this.createNewDealSnapshot();
    }
  }

  createNewDealSnapshot() : DealSnapshot {
    return  {
      entityState: 'NEW',
      entityId: {
        id: undefined
      },
      dealTypeValue: 'PHY',
      companyRoleId: {
        id: undefined,
        code: undefined
      },
      counterpartyRoleId: {
        id: undefined,
        code: undefined
      },
      dealDetail: {
        commodityCodeValue: undefined,
        ticketNo: undefined,
        buySellCodeValue: undefined,
        dealStatusCodeValue: undefined,
        startDate: undefined,
        endDate: undefined,
        volumeQuantity: undefined,
        volumeFrequencyCodeValue: undefined,
        volumeUnitOfMeasureCodeValue: undefined,
        fixedPriceValue: undefined,
        fixedPriceCurrencyCodeValue: undefined,
        fixedPriceUnitOfMeasureCodeValue: undefined,
        reportingCurrencyCodeValue: undefined,
        settlementCurrencyCodeValue: undefined

      }
    }
  }

  populateForm() {
    if (this.dealSnapshot) {
      this.myForm.controls.ticketNo.setValue(this.dealSnapshot!.dealDetail!.ticketNo);
      this.myForm!.controls.commodity.setValue(this.dealSnapshot.dealDetail?.commodityCodeValue);
      this.myForm?.controls.dealStatus.setValue(this.dealSnapshot.dealDetail?.dealStatusCodeValue);
      this.myForm?.controls.company.setValue(this.dealSnapshot.companyRoleId?.code);
      this.myForm?.controls.counterparty.setValue(this.dealSnapshot.counterpartyRoleId?.code);
      this.myForm?.controls.buySellCode.setValue(this.dealSnapshot.dealDetail?.buySellCodeValue);
      this.myForm?.controls.startDate.setValue(this.dealSnapshot.dealDetail?.startDate);
      this.myForm?.controls.endDate.setValue(this.dealSnapshot.dealDetail?.endDate);

      this.myForm?.controls.volumeQuantity.setValue(this.dealSnapshot.dealDetail?.volumeQuantity);
      this.myForm?.controls.volumeUoM.setValue(this.dealSnapshot.dealDetail?.volumeUnitOfMeasureCodeValue);
      this.myForm?.controls.volumeFrequency.setValue(this.dealSnapshot.dealDetail?.volumeFrequencyCodeValue);

      this.myForm?.controls.reportingCurrency.setValue(this.dealSnapshot.dealDetail?.reportingCurrencyCodeValue);
      this.myForm?.controls.settlementCurrency.setValue(this.dealSnapshot.dealDetail?.settlementCurrencyCodeValue);
    }
  }


  searchForCompany() {
    this.showCompanySearch = true;
  }

  searchForCounterparty() {
    this.showCounterpartySearch = true;
  }


  onCancelCompanySearch() {
    this.showCompanySearch = false;
  }

  onCancelCounterpartySearch() {
    this.showCounterpartySearch = false;
  }


  updateCompany(name: string) {
    this.myForm.controls.company.setValue(name);
    this.myForm.controls.company.markAsDirty();
    this.showCompanySearch = false;
  }

  updateCounterparty(name: string) {
    this.myForm.controls.counterparty.setValue(name);
    this.myForm.controls.counterparty.markAsDirty();
    this.showCounterpartySearch = false;
  }

  onReset() {
    this.myForm.reset();
    this.router.navigate(["deals", "list"]);

  }


  onOkay() {
    this.hasErrors = false;
    this.formErrors = [];
  }



  onSubmit() {
    this.hasErrors = false;
    this.formErrors = [];
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
      if (this.myForm.controls.commodity.invalid) {
        this.formErrors.push("Missing Commodity");
      }
      if (this.myForm.controls.dealStatus.invalid) {
        this.formErrors.push("Missing Deal Status");
      }
      if (this.myForm.controls.company.invalid) {
        this.formErrors.push("Missing Company");
      }
      if (this.myForm.controls.counterparty.invalid) {
        this.formErrors.push("Missing Counterparty");
      }
      if (this.myForm.controls.ticketNo.invalid) {
        this.formErrors.push("Missing ticketNo");
      }
      if (this.myForm.controls.buySellCode.invalid) {
        this.formErrors.push("Missing Buy/Sell");
      }
      if (this.myForm.controls.commodity.invalid) {
        this.formErrors.push("Missing Commodity");
      }
      if (this.myForm.controls.startDate.invalid) {
        this.formErrors.push("Missing start date");
      }
      if (this.myForm.controls.endDate.invalid) {
        this.formErrors.push("Missing end date");
      }
      if (this.myForm.controls.volumeQuantity.invalid) {
        this.formErrors.push("Missing volume");
      }
      if (this.myForm.controls.volumeUoM.invalid) {
        this.formErrors.push("Missing volume unit of measure");
      }
      if (this.myForm.controls.volumeFrequency.invalid) {
        this.formErrors.push("Missing volume frequency");
      }
      if (this.myForm.controls.settlementCurrency.invalid) {
        this.formErrors.push("Missing settlement currency");
      }
      if (this.myForm.controls.reportingCurrency.invalid) {
        this.formErrors.push("Missing reporting currency");
      }
    } else {
      let wasModified = this.updateSnapshot();
      this.saveDeal(wasModified);
    }
  }

  updateSnapshot(): boolean {
    let wasModified = false;
    if (this.myForm.controls.ticketNo.dirty && this.myForm.controls.ticketNo.value != null) {
      this.dealSnapshot!.dealDetail!.ticketNo = this.myForm.controls.ticketNo.value;
      wasModified = true;
    }
    if (this.myForm.controls.commodity.dirty && this.myForm.controls.commodity.value != null) {
      this.dealSnapshot!.dealDetail!.commodityCodeValue = this.myForm.controls.commodity.value;
      wasModified = true;
    }
    if (this.myForm.controls.dealStatus.dirty && this.myForm.controls.dealStatus.value != null) {
      this.dealSnapshot!.dealDetail!.dealStatusCodeValue = this.myForm.controls.dealStatus.value;
      wasModified = true;
    }
    if (this.myForm.controls.buySellCode.dirty && this.myForm.controls.buySellCode.value != null) {
      this.dealSnapshot!.dealDetail!.buySellCodeValue = this.myForm.controls.buySellCode.value;
      wasModified = true;
    }
    if (this.myForm.controls.company.dirty && this.myForm.controls.company.value != null) {
      this.dealSnapshot!.companyRoleId = {
        id: undefined,
        code: this.myForm.controls.company.value
      }
      wasModified = true;
    }
    if (this.myForm.controls.counterparty.dirty && this.myForm.controls.counterparty.value != null) {
      this.dealSnapshot!.counterpartyRoleId = {
        id: undefined,
        code: this.myForm.controls.counterparty.value
      }
      wasModified = true;
    }
    if (this.myForm.controls.startDate.dirty && this.myForm.controls.startDate.value != null) {
      this.dealSnapshot!.dealDetail!.startDate = this.myForm.controls.startDate.value;
      wasModified = true;
    }
    if (this.myForm.controls.endDate.dirty && this.myForm.controls.endDate.value != null) {
      this.dealSnapshot!.dealDetail!.endDate = this.myForm.controls.endDate.value;
      wasModified = true;
    }
    if (this.myForm.controls.volumeQuantity.dirty && this.myForm.controls.volumeQuantity.value != null) {
      this.dealSnapshot!.dealDetail!.volumeQuantity = this.myForm.controls.volumeQuantity.value;
      wasModified = true;
    }
    if (this.myForm.controls.volumeUoM.dirty && this.myForm.controls.volumeUoM.value != null) {
      this.dealSnapshot!.dealDetail!.volumeUnitOfMeasureCodeValue = this.myForm.controls.volumeUoM.value;
      wasModified = true;
    }
    if (this.myForm.controls.volumeFrequency.dirty && this.myForm.controls.volumeFrequency.value != null) {
      this.dealSnapshot!.dealDetail!.volumeFrequencyCodeValue = this.myForm.controls.volumeFrequency.value;
      wasModified = true;
    }
    if (this.myForm.controls.reportingCurrency.dirty && this.myForm.controls.reportingCurrency.value != null) {
      this.dealSnapshot!.dealDetail!.reportingCurrencyCodeValue = this.myForm.controls.reportingCurrency.value;
      wasModified = true;
    }
    if (this.myForm.controls.settlementCurrency.dirty && this.myForm.controls.settlementCurrency.value != null) {
      this.dealSnapshot!.dealDetail!.settlementCurrencyCodeValue = this.myForm.controls.settlementCurrency.value;
      wasModified = true;
    }

    return wasModified;
  }

  private saveDeal(wasModified: boolean) {
    if (wasModified && this.dealSnapshot?.entityState === 'UNMODIFIED') {
      this.dealSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.dealService.saveDeal(this.dealSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());


  }
}
