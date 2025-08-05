import { Component,  OnInit  } from '@angular/core';
import { ReactiveFormsModule} from "@angular/forms";
import {OrganizationQuickSearchComponent} from "../../organizations/organization-quick-search/organization-quick-search.component";
import {DealEditComponent} from '../deal-edit/deal-edit.component';
import {DealSnapshot, PhysicalDealSnapshot} from '../model/deal.model';
import {PriceIndexQuickSearchComponent} from '../../pricing/price-index-quick-search/price-index-quick-search.component';
import {
  BusinessContactsQuickSearchComponent
} from '../../businesscontacts/business-contacts-quick-search/business-contacts-quick-search.component';
import {HasRolesDirective} from 'keycloak-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-physical-deal-edit',
  imports: [
    ReactiveFormsModule,
    OrganizationQuickSearchComponent,
    BusinessContactsQuickSearchComponent,
    PriceIndexQuickSearchComponent,
    HasRolesDirective,
    RouterLink
  ],
  templateUrl: './physical-deal-edit.component.html',
  styleUrl: './physical-deal-edit.component.scss'
})
export class PhysicalDealEditComponent extends DealEditComponent implements OnInit {
  physicalDealSnapshot: PhysicalDealSnapshot | null = null;

  showMarketIndexSearch: boolean = false;
  showDealIndexSearch: boolean = false;

  override createNewDealSnapshot(): DealSnapshot {
    this.physicalDealSnapshot =  { ... super.createNewDealSnapshot(),
      dealPriceIndexId : {
        id: undefined,
        code: undefined
      },
      marketPriceIndexId : {
        id: undefined,
        code: undefined
      },
      physicalDealDetail: {
        dealPriceValuationCodeValue: 'FIXED',
        marketValuationCodeValue: 'INDEX'
      }
    }
    this.physicalDealSnapshot.dealTypeValue = 'PhysicalDeal';

    return this.physicalDealSnapshot;
  }

  override populateForm() {
    super.populateForm();
    this.physicalDealSnapshot = this.dealSnapshot as PhysicalDealSnapshot;
    if (this.physicalDealSnapshot?.dealDetail?.fixedPriceValue) {
      this.myForm.controls.physicalDealPricing!.controls['dealPrice']!.setValue(this.physicalDealSnapshot.dealDetail.fixedPriceValue)
    }
    if (this.physicalDealSnapshot?.dealDetail?.fixedPriceCurrencyCodeValue) {
      this.myForm.controls.physicalDealPricing!.controls['dealPriceCurrency'].setValue(this.physicalDealSnapshot.dealDetail.fixedPriceCurrencyCodeValue)
    }
    if (this.physicalDealSnapshot?.dealDetail?.fixedPriceUnitOfMeasureCodeValue) {
      this.myForm.controls.physicalDealPricing!.controls['dealPriceUoM'].setValue(this.physicalDealSnapshot.dealDetail.fixedPriceUnitOfMeasureCodeValue)
    }
    if (this.physicalDealSnapshot?.dealPriceIndexId) {
      this.myForm.controls.physicalDealPricing!.controls['dealIndex'].setValue(this.physicalDealSnapshot.dealPriceIndexId!.code)
    }
    if (this.physicalDealSnapshot?.marketPriceIndexId) {
      this.myForm.controls.physicalDealPricing!.controls['marketIndex'].setValue(this.physicalDealSnapshot.marketPriceIndexId!.code)
    }
  }


  override updateSnapshot(): boolean {

    let wasModified = super.updateSnapshot();

    if (this.myForm.controls.physicalDealPricing.controls.dealPrice.dirty && this.myForm.controls.physicalDealPricing.controls.dealPrice.value != null) {
      this.physicalDealSnapshot!.dealDetail!.fixedPriceValue = this.myForm.controls.physicalDealPricing.controls.dealPrice.value;
      wasModified = true;
    }

    if (this.myForm.controls.physicalDealPricing.controls.dealPriceCurrency.dirty && this.myForm.controls.physicalDealPricing.controls.dealPriceCurrency.value != null) {
      this.physicalDealSnapshot!.dealDetail!.fixedPriceCurrencyCodeValue = this.myForm.controls.physicalDealPricing.controls.dealPriceCurrency.value;
      wasModified = true;
    }

    if (this.myForm.controls.physicalDealPricing.controls.dealPriceUoM.dirty && this.myForm.controls.physicalDealPricing.controls.dealPriceUoM.value != null) {
      this.physicalDealSnapshot!.dealDetail!.fixedPriceUnitOfMeasureCodeValue = this.myForm.controls.physicalDealPricing.controls.dealPriceUoM.value;
      wasModified = true;
    }

    if (this.myForm.controls.physicalDealPricing.controls.dealIndex.dirty) {
      if (this.myForm.controls.physicalDealPricing.controls.dealIndex.value != null) {
        this.physicalDealSnapshot!.dealPriceIndexId = {
          id: undefined,
          code: this.myForm.controls.physicalDealPricing.controls.dealIndex.value
        }
      } else {
        this.physicalDealSnapshot!.dealPriceIndexId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }

    if (this.myForm.controls.physicalDealPricing.controls.marketIndex.dirty) {
      if (this.myForm.controls.physicalDealPricing.controls.marketIndex.value != null) {
        this.physicalDealSnapshot!.marketPriceIndexId = {
          id: undefined,
          code: this.myForm.controls.physicalDealPricing.controls.marketIndex.value
        }
      } else {
        this.physicalDealSnapshot!.marketPriceIndexId = {
          id: undefined,
          code: undefined
        }
      }
      wasModified = true;
    }

    if (wasModified) {
      if (this.physicalDealSnapshot?.dealDetail?.fixedPriceValue) {
        if (this.physicalDealSnapshot.dealPriceIndexId?.code) {
          this.physicalDealSnapshot.physicalDealDetail = {
            dealPriceValuationCodeValue: 'INDEX_PLUS',
            marketValuationCodeValue: 'INDEX'
          }
        } else {
          this.physicalDealSnapshot.physicalDealDetail = {
            dealPriceValuationCodeValue: 'FIXED',
            marketValuationCodeValue: 'INDEX'
          }
        }
      } else {
        this.physicalDealSnapshot!.physicalDealDetail = {
          dealPriceValuationCodeValue: 'INDEX',
          marketValuationCodeValue: 'INDEX'
        }
      }
    }


    return wasModified;
   }


  searchForMarketIndex() {
    this.showMarketIndexSearch = true;
  }


  onCancelMarketIndexSearch() {
    this.showMarketIndexSearch = false;
  }


  updateMarketIndex(name: string) {
    this.myForm.controls.physicalDealPricing.controls.marketIndex.setValue(name);
    this.myForm.controls.physicalDealPricing.controls.marketIndex.markAsDirty();
    this.showMarketIndexSearch = false;
  }



  searchForDealIndex() {
    this.showDealIndexSearch = true;
  }


  onCancelDealIndexSearch() {
    this.showDealIndexSearch = false;
  }


  updateDealIndex(name: string) {
    this.myForm.controls.physicalDealPricing.controls.dealIndex.setValue(name);
    this.myForm.controls.physicalDealPricing.controls.dealIndex.markAsDirty();
    this.showDealIndexSearch = false;
  }

}
