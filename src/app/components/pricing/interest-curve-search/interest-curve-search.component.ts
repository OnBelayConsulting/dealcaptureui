import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {InterestCurveSearchService} from '../services/interest-curve-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-interest-curve-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class InterestCurveSearchComponent extends BaseSearchComponent {


  constructor() {
    super(inject(InterestCurveSearchService));
  }

}
