import {Component, inject} from '@angular/core';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {PowerProfileSearchService} from '../service/power-profile-search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-power-profile-search',
  imports: [FormsModule],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class PowerProfileSearchComponent extends BaseSearchComponent {
  constructor() {
    super( inject(PowerProfileSearchService));
  }
}
