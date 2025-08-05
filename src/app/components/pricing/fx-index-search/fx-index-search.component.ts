import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {FxIndexSearchService} from '../services/fx-index-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-fx-index-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class FxIndexSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(FxIndexSearchService));
  }
}
