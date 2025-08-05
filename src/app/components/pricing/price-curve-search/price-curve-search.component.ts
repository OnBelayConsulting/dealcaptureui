import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PriceCurveSearchService} from '../services/price-curve-search.service';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';

@Component({
  selector: 'app-price-curve-search',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PriceCurveSearchComponent  extends BaseSearchComponent {

  priceCurveSearchService = inject(PriceCurveSearchService);
  constructor() {
    super(inject(PriceCurveSearchService))

  }

}
