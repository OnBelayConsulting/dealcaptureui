import {Component, computed, input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DealSnapshot, PhysicalDealSnapshot} from '../../deals/model/deal.model';

@Component({
  selector: 'app-physical-deal-view',
    imports: [
        FormsModule
    ],
  templateUrl: './physical-deal-view.component.html',
  styleUrl: './physical-deal-view.component.scss'
})
export class PhysicalDealViewComponent {
  deal =  input.required<DealSnapshot>();

  physicalDeal() : PhysicalDealSnapshot {
    return this.deal() as PhysicalDealSnapshot;
  }


  priceLabel = computed<string | undefined>(
    () => 'Price (' +
        this.physicalDeal()!.dealDetail!.fixedPriceCurrencyCodeValue +
        " / " +
        this.physicalDeal()!.dealDetail!.fixedPriceUnitOfMeasureCodeValue +
        ')');
}
