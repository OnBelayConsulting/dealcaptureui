import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DealSearchService} from '../services/deal-search.service';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';

@Component({
  selector: 'app-deal-search',
  imports: [
    FormsModule
  ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class DealSearchComponent  extends BaseSearchComponent {

  constructor() {
    super(inject(DealSearchService));
  }
}
