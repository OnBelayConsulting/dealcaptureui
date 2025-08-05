import {Component, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PriceCurveSearchService} from '../../pricing/services/price-curve-search.service';
import {SearchColumnModel, SearchOperator} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';
import {PositionSearchService} from '../service/position-search.service';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';

@Component({
  selector: 'app-position-search',
    imports: [
        FormsModule,
    ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PositionSearchComponent extends BaseSearchComponent {

  constructor() {
    super( inject(PositionSearchService));
  }
}
