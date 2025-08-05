import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {PowerProfilePositionSearchService} from '../service/profile-position-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile-positions-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class ProfilePositionsSearchComponent extends BaseSearchComponent {


  constructor() {
    super(inject(PowerProfilePositionSearchService));
  }
}
