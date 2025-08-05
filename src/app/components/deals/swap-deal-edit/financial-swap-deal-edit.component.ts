import {Component, OnInit} from '@angular/core';
import {
    BusinessContactsQuickSearchComponent
} from "../../businesscontacts/business-contacts-quick-search/business-contacts-quick-search.component";
import {HasRolesDirective} from "keycloak-angular";
import {
    OrganizationQuickSearchComponent
} from "../../organizations/organization-quick-search/organization-quick-search.component";
import {
    PriceIndexQuickSearchComponent
} from "../../pricing/price-index-quick-search/price-index-quick-search.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {DealEditComponent} from '../deal-edit/deal-edit.component';
import {DealSnapshot, FinancialSwapDealSnapshot, PhysicalDealSnapshot} from '../model/deal.model';

@Component({
  selector: 'app-swap-deal-edit',
    imports: [
        BusinessContactsQuickSearchComponent,
        HasRolesDirective,
        OrganizationQuickSearchComponent,
        PriceIndexQuickSearchComponent,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './financial-swap-deal-edit.component.html',
  styleUrl: './financial-swap-deal-edit.component.scss'
})
export class FinancialSwapDealEditComponent extends DealEditComponent implements OnInit {

  financialSwapDealSnapshot : FinancialSwapDealSnapshot | null = null;
  showPaysIndexSearch: boolean = false;
  showReceivesIndexSearch: boolean = false;

  override createNewDealSnapshot(): DealSnapshot {
    this.financialSwapDealSnapshot =  { ... super.createNewDealSnapshot(),
      paysPriceIndexId : {
        id: undefined,
        code: undefined
      },
      receivesPriceIndexId : {
        id: undefined,
        code: undefined
      },
      detail: {
        paysValuationCodeValue: 'Fixed',
        receivesValuationCodeValue: 'Index'
      }
    }
    this.financialSwapDealSnapshot.dealTypeValue = 'FinancialSwap';

    return this.financialSwapDealSnapshot;
  }

  override populateForm() {
    super.populateForm();
    this.financialSwapDealSnapshot = this.dealSnapshot as FinancialSwapDealSnapshot;
    if (this.financialSwapDealSnapshot?.dealDetail?.fixedPriceValue) {
      this.myForm.controls.financialSwapDealPricing!.controls['dealPrice']!.setValue(this.financialSwapDealSnapshot.dealDetail.fixedPriceValue)
    }
    if (this.financialSwapDealSnapshot?.dealDetail?.fixedPriceCurrencyCodeValue) {
      this.myForm.controls.financialSwapDealPricing!.controls['dealPriceCurrency'].setValue(this.financialSwapDealSnapshot.dealDetail.fixedPriceCurrencyCodeValue)
    }
    if (this.financialSwapDealSnapshot?.dealDetail?.fixedPriceUnitOfMeasureCodeValue) {
      this.myForm.controls.financialSwapDealPricing!.controls['dealPriceUoM'].setValue(this.financialSwapDealSnapshot.dealDetail.fixedPriceUnitOfMeasureCodeValue)
    }
    if (this.financialSwapDealSnapshot?.paysPriceIndexId) {
      this.myForm.controls.financialSwapDealPricing!.controls['paysIndex'].setValue(this.financialSwapDealSnapshot.paysPriceIndexId!.code)
    }
    if (this.financialSwapDealSnapshot?.receivesPriceIndexId) {
      this.myForm.controls.financialSwapDealPricing!.controls['receivesIndex'].setValue(this.financialSwapDealSnapshot.receivesPriceIndexId!.code)
    }
  }


  override updateSnapshot(): boolean {

    let wasModified = super.updateSnapshot();

    if (this.myForm.controls.financialSwapDealPricing.controls.dealPrice.dirty && this.myForm.controls.financialSwapDealPricing.controls.dealPrice.value != null) {
      this.financialSwapDealSnapshot!.dealDetail!.fixedPriceValue = this.myForm.controls.financialSwapDealPricing.controls.dealPrice.value;
      wasModified = true;
    }

    if (this.myForm.controls.financialSwapDealPricing.controls.dealPriceCurrency.dirty && this.myForm.controls.financialSwapDealPricing.controls.dealPriceCurrency.value != null) {
      this.financialSwapDealSnapshot!.dealDetail!.fixedPriceCurrencyCodeValue = this.myForm.controls.financialSwapDealPricing.controls.dealPriceCurrency.value;
      wasModified = true;
    }

    if (this.myForm.controls.financialSwapDealPricing.controls.dealPriceUoM.dirty && this.myForm.controls.financialSwapDealPricing.controls.dealPriceUoM.value != null) {
      this.financialSwapDealSnapshot!.dealDetail!.fixedPriceUnitOfMeasureCodeValue = this.myForm.controls.financialSwapDealPricing.controls.dealPriceUoM.value;
      wasModified = true;
    }

    if (this.myForm.controls.financialSwapDealPricing.controls.paysIndex.dirty) {
      if (this.myForm.controls.financialSwapDealPricing.controls.paysIndex.value != null) {
        this.financialSwapDealSnapshot!.paysPriceIndexId = {
          id: undefined,
          code: this.myForm.controls.financialSwapDealPricing.controls.paysIndex.value
        }
      } else {
        this.financialSwapDealSnapshot!.paysPriceIndexId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }

    if (this.myForm.controls.financialSwapDealPricing.controls.receivesIndex.dirty) {
      if (this.myForm.controls.financialSwapDealPricing.controls.receivesIndex.value != null) {
        this.financialSwapDealSnapshot!.receivesPriceIndexId = {
          id: undefined,
          code: this.myForm.controls.financialSwapDealPricing.controls.receivesIndex.value
        }
      } else {
        this.financialSwapDealSnapshot!.receivesPriceIndexId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }

    if (wasModified) {
      if (this.financialSwapDealSnapshot?.dealDetail?.fixedPriceValue) {
        if (this.financialSwapDealSnapshot.paysPriceIndexId?.code) {
          this.financialSwapDealSnapshot.detail = {
            paysValuationCodeValue: 'IndexPlus',
            receivesValuationCodeValue: 'Index'
          }
        } else {
          this.financialSwapDealSnapshot.detail = {
            paysValuationCodeValue: 'Fixed',
            receivesValuationCodeValue: 'Index'
          }
        }
      } else {
        this.financialSwapDealSnapshot!.detail = {
          paysValuationCodeValue: 'Index',
          receivesValuationCodeValue: 'Index'
        }
      }
    }


    return wasModified;
  }


  searchForPaysIndex() {
    this.showPaysIndexSearch = true;
  }


  onCancelPaysIndexSearch() {
    this.showPaysIndexSearch = false;
  }


  updatePaysIndex(name: string) {
    this.myForm.controls.financialSwapDealPricing.controls.paysIndex.setValue(name);
    this.myForm.controls.financialSwapDealPricing.controls.paysIndex.markAsDirty();
    this.showPaysIndexSearch = false;
  }



  searchForReceivesIndex() {
    this.showReceivesIndexSearch = true;
  }


  onCancelReceivesIndexSearch() {
    this.showReceivesIndexSearch = false;
  }


  updateReceivesIndex(name: string) {
    this.myForm.controls.financialSwapDealPricing.controls.receivesIndex.setValue(name);
    this.myForm.controls.financialSwapDealPricing.controls.receivesIndex.markAsDirty();
    this.showReceivesIndexSearch = false;
  }

}
