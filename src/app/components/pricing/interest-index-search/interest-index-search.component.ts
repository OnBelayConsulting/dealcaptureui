import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {InterestIndexSearchService} from '../services/interest-rate-index-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-interest-index-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class InterestIndexSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(InterestIndexSearchService));
  }

}
