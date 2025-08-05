import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {PriceRiskFactorSearchService} from '../service/price-riskfactor-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-price-riskfactor-search',
  imports: [    FormsModule,
  ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PriceRiskFactorSearchComponent extends BaseSearchComponent {


  constructor() {
    super(inject(PriceRiskFactorSearchService));
  }
}
