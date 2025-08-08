import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {PricingLocationSearchService} from '../services/pricing-location-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pricing-location-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PricingLocationSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(PricingLocationSearchService));
  }
}
