import {Component, OnInit} from '@angular/core';
import {
    BusinessContactsQuickSearchComponent
} from "../../businesscontacts/business-contacts-quick-search/business-contacts-quick-search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HasRolesDirective} from "keycloak-angular";
import {
    OrganizationQuickSearchComponent
} from "../../organizations/organization-quick-search/organization-quick-search.component";
import {
    PriceIndexQuickSearchComponent
} from "../../pricing/price-index-quick-search/price-index-quick-search.component";
import {RouterLink} from "@angular/router";
import {DealSnapshot, FinancialSwapDealSnapshot, VanillaOptionDealSnapshot} from '../model/deal.model';
import {DealEditComponent} from '../deal-edit/deal-edit.component';

@Component({
  selector: 'app-vanilla-option-edit',
  imports: [
    BusinessContactsQuickSearchComponent,
    FormsModule,
    HasRolesDirective,
    OrganizationQuickSearchComponent,
    PriceIndexQuickSearchComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './vanilla-option-edit.component.html',
  styleUrl: './vanilla-option-edit.component.scss'
})
export class VanillaOptionEditComponent  extends DealEditComponent implements OnInit{

  vanillaOptionSnapshot : VanillaOptionDealSnapshot | null = null;
  showUnderlyingIndexSearch: boolean = false;

  override createNewDealSnapshot(): DealSnapshot {
    this.vanillaOptionSnapshot =  { ... super.createNewDealSnapshot(),
      underlyingPriceIndexId : {
        id: undefined,
        code: undefined
      },
      detail: {
        optionExpiryDateRuleValue : 'pstart',
        tradeTypeCodeValue : 'OTC',
        optionStyleCodeValue : 'American',
        optionTypeCodeValue : 'Put',
        premiumPriceCurrencyCodeValue : null,
        premiumPriceUnitOfMeasureCodeValue : null,
        premiumPriceValue : null,
        strikePriceCurrencyCodeValue : null,
        strikePriceUnitOfMeasureCodeValue : null,
        strikePriceValue : null


      }
    }
    this.vanillaOptionSnapshot.dealTypeValue = 'VanillaOption';

    return this.vanillaOptionSnapshot;
  }

  override populateForm() {
    super.populateForm();
    this.vanillaOptionSnapshot = this.dealSnapshot as VanillaOptionDealSnapshot;
    if (this.vanillaOptionSnapshot?.detail?.tradeTypeCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.tradeTypeCode.setValue(this.vanillaOptionSnapshot.detail.tradeTypeCodeValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.optionTypeCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.optionTypeCode.setValue(this.vanillaOptionSnapshot.detail.optionTypeCodeValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.optionStyleCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.optionStyleCode.setValue(this.vanillaOptionSnapshot.detail.optionStyleCodeValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.optionExpiryDateRuleValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.optionExpiryDateRule.setValue(this.vanillaOptionSnapshot.detail.optionExpiryDateRuleValue)
    }

    if (this.vanillaOptionSnapshot?.detail?.premiumPriceValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.premiumPrice.setValue(this.vanillaOptionSnapshot.detail.premiumPriceValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.premiumPriceCurrencyCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.premiumPriceCurrency.setValue(this.vanillaOptionSnapshot.detail.premiumPriceCurrencyCodeValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.premiumPriceUnitOfMeasureCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.premiumPriceUoM.setValue(this.vanillaOptionSnapshot.detail.premiumPriceUnitOfMeasureCodeValue)
    }

    if (this.vanillaOptionSnapshot?.detail?.strikePriceValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.strikePrice.setValue(this.vanillaOptionSnapshot.detail.strikePriceValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.strikePriceCurrencyCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.strikePriceCurrency.setValue(this.vanillaOptionSnapshot.detail.strikePriceCurrencyCodeValue)
    }
    if (this.vanillaOptionSnapshot?.detail?.strikePriceUnitOfMeasureCodeValue) {
      this.myForm.controls.vanillaOptionPricing!.controls.strikePriceUoM.setValue(this.vanillaOptionSnapshot.detail.strikePriceUnitOfMeasureCodeValue)
    }


    if (this.vanillaOptionSnapshot?.underlyingPriceIndexId) {
      this.myForm.controls.vanillaOptionPricing!.controls.underlyingIndex.setValue(this.vanillaOptionSnapshot.underlyingPriceIndexId!.code)
    }
  }


  override updateSnapshot(): boolean {

    let wasModified = super.updateSnapshot();
    if (this.myForm.controls.vanillaOptionPricing.controls.tradeTypeCode.dirty && this.myForm.controls.vanillaOptionPricing.controls.tradeTypeCode.value != null) {
      this.vanillaOptionSnapshot!.detail!.tradeTypeCodeValue = this.myForm.controls.vanillaOptionPricing.controls.tradeTypeCode.value as 'OTC' | 'Exchange';
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.optionStyleCode.dirty && this.myForm.controls.vanillaOptionPricing.controls.optionStyleCode.value != null) {
      this.vanillaOptionSnapshot!.detail!.optionStyleCodeValue = this.myForm.controls.vanillaOptionPricing.controls.optionStyleCode.value as 'European' | 'American';
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.optionTypeCode.dirty && this.myForm.controls.vanillaOptionPricing.controls.optionTypeCode.value != null) {
      this.vanillaOptionSnapshot!.detail!.optionTypeCodeValue = this.myForm.controls.vanillaOptionPricing.controls.optionTypeCode.value as 'Put' | 'Call';
      wasModified = true;
    }


    if (this.myForm.controls.vanillaOptionPricing.controls.optionExpiryDateRule.dirty && this.myForm.controls.vanillaOptionPricing.controls.optionExpiryDateRule.value != null) {
      this.vanillaOptionSnapshot!.detail!.optionExpiryDateRuleValue = this.myForm.controls.vanillaOptionPricing.controls.optionExpiryDateRule.value as 'pstart' | 'pend';
      wasModified = true;
    }


    // premium
    if (this.myForm.controls.vanillaOptionPricing.controls.premiumPrice.dirty && this.myForm.controls.vanillaOptionPricing.controls.premiumPrice.value != null) {
      this.vanillaOptionSnapshot!.detail!.premiumPriceValue = this.myForm.controls.vanillaOptionPricing.controls.premiumPrice.value;
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.premiumPriceCurrency.dirty && this.myForm.controls.vanillaOptionPricing.controls.premiumPriceCurrency.value != null) {
      this.vanillaOptionSnapshot!.detail!.premiumPriceCurrencyCodeValue = this.myForm.controls.vanillaOptionPricing.controls.premiumPriceCurrency.value;
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.premiumPriceUoM.dirty && this.myForm.controls.vanillaOptionPricing.controls.premiumPriceUoM.value != null) {
      this.vanillaOptionSnapshot!.detail!.premiumPriceUnitOfMeasureCodeValue = this.myForm.controls.vanillaOptionPricing.controls.premiumPriceUoM.value;
      wasModified = true;
    }


    if (this.myForm.controls.vanillaOptionPricing.controls.strikePrice.dirty && this.myForm.controls.vanillaOptionPricing.controls.strikePrice.value != null) {
      this.vanillaOptionSnapshot!.detail!.strikePriceValue = this.myForm.controls.vanillaOptionPricing.controls.strikePrice.value;
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.strikePriceCurrency.dirty && this.myForm.controls.vanillaOptionPricing.controls.strikePriceCurrency.value != null) {
      this.vanillaOptionSnapshot!.detail!.strikePriceCurrencyCodeValue = this.myForm.controls.vanillaOptionPricing.controls.strikePriceCurrency.value;
      wasModified = true;
    }

    if (this.myForm.controls.vanillaOptionPricing.controls.strikePriceUoM.dirty && this.myForm.controls.vanillaOptionPricing.controls.strikePriceUoM.value != null) {
      this.vanillaOptionSnapshot!.detail!.strikePriceUnitOfMeasureCodeValue = this.myForm.controls.vanillaOptionPricing.controls.strikePriceUoM.value;
      wasModified = true;
    }


    if (this.myForm.controls.vanillaOptionPricing.controls.underlyingIndex.dirty) {
      if (this.myForm.controls.vanillaOptionPricing.controls.underlyingIndex.value != null) {
        this.vanillaOptionSnapshot!.underlyingPriceIndexId = {
          id: undefined,
          code: this.myForm.controls.vanillaOptionPricing.controls.underlyingIndex.value
        }
      } else {
        this.vanillaOptionSnapshot!.underlyingPriceIndexId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }

    return wasModified;
  }


  searchForUnderlyingIndex() {
    this.showUnderlyingIndexSearch = true;
  }


  onCancelUnderlyingIndexSearch() {
    this.showUnderlyingIndexSearch = false;
  }


  updateUnderlyingIndex(name: string) {
    this.myForm.controls.vanillaOptionPricing.controls.underlyingIndex.setValue(name);
    this.myForm.controls.vanillaOptionPricing.controls.underlyingIndex.markAsDirty();
    this.showUnderlyingIndexSearch = false;
  }




}
