import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {PriceCurveSearchService} from '../services/price-curve-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-fx-curve-search',
  imports: [
    FormsModule
  ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class FxCurveSearchComponent extends BaseSearchComponent{

  constructor() {
    super(inject(PriceCurveSearchService));
  }
}
