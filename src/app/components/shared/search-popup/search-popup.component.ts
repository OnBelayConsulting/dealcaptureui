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
import {OrganizationService} from '../../organizations/services/organization.service';
import {OrganizationRoleSummary, OrganizationRoleSummaryCollection} from '../../organizations/model/organization.model';

@Component({
  selector: 'app-search-popup',
  imports: [FormsModule],
  templateUrl: './search-popup.component.html',
  styleUrl: './search-popup.component.scss'
})
export class SearchPopupComponent  implements OnInit {
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
  showNoItems = false;
  ngOnInit() {
    if (this.searchField && this.searchField() ) {
      this.searchOn.set(this.searchField()!);
    }
  }

  private populateListBox(collection : OrganizationRoleSummaryCollection) {
    if (collection && collection.totalItems > 0) {
      let first = this.convertToSearchModel(collection.snapshots[0]);
      this.searchResult.set(first.columnName);
      this.searchResults.set(collection.snapshots.map( (s) => this.convertToSearchModel(s)));
    } else {
      this.showNoItems = true;
    }
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
    if (this.searchOn() && this.searchOn().length > 0) {
      let subscription = this.organizationService.findOrganizationRoleSummaries(this.searchOn()!, this.roleType()).subscribe({
        next: (data) => {this.populateListBox(data)},
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());

    }

  }
}
