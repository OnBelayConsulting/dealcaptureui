import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {OrganizationSearchService} from '../services/list-organizations.service';
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';

@Component({
  selector: 'app-org-search',
  imports: [
    FormsModule
  ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class OrganizationSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(OrganizationSearchService));
  }
}
