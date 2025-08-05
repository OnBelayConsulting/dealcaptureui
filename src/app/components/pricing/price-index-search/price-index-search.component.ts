import {Component, inject} from '@angular/core';
import {PriceIndexSearchService} from '../services/price-index-search.service';
import {FormsModule} from '@angular/forms';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';

@Component({
  selector: 'app-price-index-search',
  imports: [
    FormsModule
  ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PriceIndexSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(PriceIndexSearchService));
  }

}
