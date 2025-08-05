import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DealSnapshot} from '../model/deal.model';
import {DealService} from '../../../services/deal.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {BusinessContactSnapshot} from '../../businesscontacts/model/business-contact.model';
import {SearchColumnModel} from '../../../models/search-column.model';
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

  companyTraderContactModel : SearchColumnModel | undefined = undefined;
  counterpartyTraderContactModel : SearchColumnModel | undefined = undefined;
  administratorContactModel : SearchColumnModel | undefined = undefined;

  showCompanyTraderSearch: boolean = false;
  showCounterpartyTraderSearch: boolean = false;

  showAdministratorSearch: boolean = false;


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

    companyTrader: new FormControl<string | undefined>(undefined,{
        validators: [
        Validators.required,
      ],
    }),

    counterparty: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),

    counterpartyTrader: new FormControl<string | undefined>(undefined, {

    }),

    administrator: new FormControl<string | undefined>(undefined, {

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
      })
    }),

   financialSwapDealPricing: new FormGroup({

      dealPrice : new FormControl<number | undefined>(undefined, {
      }),

      dealPriceCurrency : new FormControl<string | undefined>(undefined, {
      }),
      dealPriceUoM : new FormControl<string | undefined>(undefined, {

      }),
      receivesIndex : new FormControl<string | undefined>(undefined, {
      }),
      paysIndex : new FormControl<string | undefined>(undefined, {
      })
    }),


    vanillaOptionPricing: new FormGroup({


      tradeTypeCode : new FormControl<string | undefined>(undefined, {
      }),

      optionTypeCode : new FormControl<string | undefined>(undefined, {
      }),

      optionStyleCode : new FormControl<string | undefined>(undefined, {
      }),


      optionExpiryDateRule : new FormControl<string | undefined>(undefined, {
      }),


      premiumPrice : new FormControl<number | undefined>(undefined, {
      }),

      premiumPriceCurrency : new FormControl<string | undefined>(undefined, {
      }),
      premiumPriceUoM : new FormControl<string | undefined>(undefined, {
      }),

      strikePrice : new FormControl<number | undefined>(undefined, {
      }),

      strikePriceCurrency : new FormControl<string | undefined>(undefined, {
      }),
      strikePriceUoM : new FormControl<string | undefined>(undefined, {
      }),

      underlyingIndex : new FormControl<string | undefined>(undefined, {
      }),
    })



  });

  ngOnInit(): void {
    this.myForm.controls.companyTrader.disable();
    this.myForm.controls.counterpartyTrader.disable();
    this.myForm.controls.administrator.disable();
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
      this.populateForm();
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
      companyTraderId: {
        id: undefined,
        code: undefined,
        description : undefined
      },
      counterpartyRoleId: {
        id: undefined,
        code: undefined
      },
      counterpartyTraderId: {
        id: undefined,
        code: undefined,
        description : undefined
      },
      administratorId: {
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
    this.myForm.reset();

    if (this.dealSnapshot) {
      this.myForm.controls.ticketNo.setValue(this.dealSnapshot!.dealDetail!.ticketNo);
      this.myForm!.controls.commodity.setValue(this.dealSnapshot.dealDetail?.commodityCodeValue);
      this.myForm?.controls.dealStatus.setValue(this.dealSnapshot.dealDetail?.dealStatusCodeValue);

      if (this.dealSnapshot.companyRoleId) {
        this.myForm?.controls.company.setValue(this.dealSnapshot.companyRoleId?.code);
      }

      if (this.dealSnapshot.companyTraderId) {
        this.myForm?.controls.companyTrader.setValue(this.dealSnapshot.companyTraderId?.description);
        this.companyTraderContactModel = {
          label: this.dealSnapshot.companyTraderId!.description!,
          columnName: this.dealSnapshot.companyTraderId!.code!,
          columnType: "TEXT"
        };
      } else {
        this.companyTraderContactModel = undefined;
      }

      if (this.dealSnapshot.companyRoleId)
        this.myForm?.controls.counterparty.setValue(this.dealSnapshot.counterpartyRoleId?.code);

      if (this.dealSnapshot.counterpartyTraderId) {
        this.myForm?.controls.counterpartyTrader.setValue(this.dealSnapshot.counterpartyTraderId?.description);
        this.counterpartyTraderContactModel = {
          label: this.dealSnapshot.counterpartyTraderId!.description!,
          columnName: this.dealSnapshot.counterpartyTraderId!.code!,
          columnType: "TEXT"
        };
      }
      if (this.dealSnapshot.administratorId) {
        this.myForm?.controls.administrator.setValue(this.dealSnapshot.administratorId?.code);
        this.administratorContactModel = {
          label: this.dealSnapshot.administratorId!.description!,
          columnName: this.dealSnapshot.administratorId!.code!,
          columnType: "TEXT"
        };
      }

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


  searchForCompanyTrader() {
    this.showCompanyTraderSearch = true;
  }

  searchForCounterpartyTrader() {
    this.showCounterpartyTraderSearch = true;
  }


  searchForAdministrator() {
    this.showAdministratorSearch = true;
  }


  onCancelCompanySearch() {
    this.showCompanySearch = false;
  }

  onCancelCounterpartySearch() {
    this.showCounterpartySearch = false;
  }


  onCancelCompanyTraderSearch() {
    this.showCompanyTraderSearch = false;
  }

  onCancelCounterpartyTraderSearch() {
    this.showCounterpartyTraderSearch = false;
  }

  onCancelAdministratorSearch() {
    this.showAdministratorSearch = false;
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

  updateCompanyTrader(model: SearchColumnModel) {
    this.companyTraderContactModel = model;
    this.myForm.controls.companyTrader.setValue(model.label);
    this.myForm.controls.companyTrader.markAsDirty();
    this.showCompanyTraderSearch = false;
  }

  updateCounterpartyTrader(model: SearchColumnModel) {
    this.counterpartyTraderContactModel = model;
    this.myForm.controls.counterpartyTrader.setValue(model.label);
    this.myForm.controls.counterpartyTrader.markAsDirty();
    this.showCounterpartyTraderSearch = false;
  }

  updateAdministrator(model: SearchColumnModel) {
    this.administratorContactModel = model;
    this.myForm.controls.administrator.setValue(model.label);
    this.myForm.controls.administrator.markAsDirty();
    this.showAdministratorSearch = false;
  }

  onReset() {
    this.populateForm()
  }


  onCancel() {
    this.router.navigate(["deals", "list"]);
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
      if (this.myForm.controls.companyTrader.invalid) {
        this.formErrors.push("Missing Company Trader");
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
    if (this.myForm.controls.companyTrader.dirty && this.myForm.controls.companyTrader.value != null) {
      this.dealSnapshot!.companyTraderId = {
        id: undefined,
        code: this.companyTraderContactModel?.columnName
      }
      wasModified = true;
    }
    if (this.myForm.controls.counterparty.dirty) {
      if (this.myForm.controls.counterparty) {
        this.dealSnapshot!.counterpartyRoleId = {
          id: undefined,
          code: this.myForm.controls.counterparty.value
        }
        wasModified = true;
      }
    }
    if (this.myForm.controls.counterpartyTrader.dirty) {
      if (this.myForm.controls.counterpartyTrader.value) {
        this.dealSnapshot!.counterpartyTraderId = {
          id: undefined,
          code: this.myForm.controls.counterpartyTrader.value
        }
      } else {
        this.dealSnapshot!.counterpartyTraderId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }
    if (this.myForm.controls.administrator.dirty)  {
      if (this.myForm.controls.administrator.value) {
        this.dealSnapshot!.administratorId = {
          id: undefined,
          code: this.myForm.controls.administrator.value
        }
      } else {
        this.dealSnapshot!.administratorId = {
          id: undefined,
          code: undefined
        }
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
