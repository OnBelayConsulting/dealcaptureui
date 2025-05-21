import {Component, computed, Input, input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DealSnapshot, PhysicalDealSnapshot} from '../model/deal.model';

@Component({
  selector: 'app-base-deal-view',
    imports: [
        FormsModule
    ],
  templateUrl: './base-deal-view.component.html',
  styleUrl: './base-deal-view.component.scss'
})
export class BaseDealViewComponent {
  deal =  input.required<DealSnapshot>();


  volumeUoMAndFrequencyComputed = computed<string | undefined>(
    () => this.deal().dealDetail?.volumeUnitOfMeasureCodeValue + " / " + this.deal().dealDetail?.volumeFrequencyCodeValue );

}
