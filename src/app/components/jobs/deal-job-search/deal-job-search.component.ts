import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseSearchComponent} from '../../shared/base-search/base-search.component';
import {DealJobSearchService} from '../service/deal-job-search.service';

@Component({
  selector: 'app-deal-job-search',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: '../../shared/base-search/base-search.component.html',
  styleUrl: '../../shared/base-search/base-search.component.scss'
})
export class DealJobSearchComponent extends BaseSearchComponent {

  constructor() {
    super(inject(DealJobSearchService));
  }
}
