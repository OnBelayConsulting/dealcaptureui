import {
  Component,
  DestroyRef,
  inject,
  input, OnInit,
  output,
  signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SearchColumnModel} from '../../../models/search-column.model';
import {OrganizationService} from '../../../services/organization.service';
import {OrganizationRoleSummary, OrganizationRoleSummaryCollection} from '../model/organization.model';

@Component({
  selector: 'app-organization-quick-search',
  imports: [FormsModule],
  templateUrl: './organization-quick-search.component.html',
  styleUrl: '../../shared/search/quick-search.component.scss'
})
export class OrganizationQuickSearchComponent implements OnInit {
  private organizationService = inject(OrganizationService);
  destroyRef = inject(DestroyRef);

  result = output<string>();
  cancel = output<string>();


  title = input<string>();
  roleType = input.required<string>();
  searchOn = signal<string>('');

  searchField = input<string | undefined>(undefined);
  searchResults = signal<SearchColumnModel[]>([]);
  searchResult = signal<string>("");
  searchCount = signal<number>(0);
  searchTotal = signal<number>(0);
  showNoItems = false;

  ngOnInit() {
    if (this.searchField && this.searchField() ) {
      this.searchOn.set(this.searchField()!);
    }
    this.onSearch();
  }

  private convertToSearchModel(summary: OrganizationRoleSummary) : SearchColumnModel {
    return {label: summary.detail.shortName, columnName: summary.detail.shortName, columnType: "TEXT"};
  }

  onSelect() {
    this.result.emit(this.searchResult());
  }

  onCancel() {
    this.cancel.emit("cancel");
  }


  onSearch() {
    this.showNoItems = false;
      let subscription = this.organizationService.findOrganizationRoleSummaries(this.searchOn()!, this.roleType()).subscribe({
        next: (data) => {this.populateListBox(data)},
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());


  }

  private populateListBox(collection : OrganizationRoleSummaryCollection) {
    if (collection && collection.totalItems > 0) {
      let first = this.convertToSearchModel(collection.snapshots[0]);
      this.searchResult.set(first.columnName);
      this.searchResults.set(collection.snapshots.map( (s) => this.convertToSearchModel(s)));
      this.searchCount.set(collection.count);
      this.searchTotal.set(collection.totalItems);

    } else {
      this.showNoItems = true;
    }
  }

}
