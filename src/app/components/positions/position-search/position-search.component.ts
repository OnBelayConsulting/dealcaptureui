import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
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
