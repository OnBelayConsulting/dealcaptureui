import {Component, DestroyRef, inject, input, output, signal} from '@angular/core';
import {SearchColumnModel} from '../../../models/search-column.model';
import {InterestIndexService} from '../../../services/interest-rate-index.service';
import {InterestIndexSnapshot, InterestIndexSnapshotCollection} from '../model/interest-rate.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-interest-index-quick-search',
  imports: [
    FormsModule
  ],
  templateUrl: './interest-index-quick-search.component.html',
  styleUrl: './interest-index-quick-search.component.scss'
})
export class InterestIndexQuickSearchComponent {
  private interestIndexService = inject(InterestIndexService);
  destroyRef = inject(DestroyRef);

  result = output<string>();
  cancel = output<string>();

  title = input<string>();
  searchOn = signal<string| undefined>(undefined);

  searchField = input<string | undefined>(undefined);
  searchTotalCount = signal<number | undefined>(undefined);
  searchCount = signal<number | undefined>(undefined);

  searchResults = signal<SearchColumnModel[]>([]);
  searchResult = signal<string>("");
  showNoItems = false;

  ngOnInit() {
    if (this.searchField && this.searchField() ) {
      this.searchOn.set(this.searchField()!);
    }
    this.onSearch();
  }
  onSelect() {
    this.result.emit(this.searchResult());
  }


  onCancel() {
    this.cancel.emit('cancel');
  }


  onSearch() {
    this.showNoItems = false;
    let selectionCriteria ;
    if (this.searchOn())
      selectionCriteria = "WHERE name startsWith '" + this.searchOn() + "'";
    else
      selectionCriteria = "WHERE ";
    let subscription = this.interestIndexService.findInterestIndices(selectionCriteria, 0, 100).subscribe({
      next: (data) => {this.populateListBox(data)},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  private populateListBox(collection : InterestIndexSnapshotCollection) {
    if (collection && collection.totalItems > 0) {
      this.searchCount.set(collection.count);
      this.searchTotalCount.set(collection.totalItems);
      let first = this.convertToSearchModel(collection.snapshots[0]);
      this.searchResult.set(first.columnName);
      this.searchResults.set(collection.snapshots.map( (s) => this.convertToSearchModel(s)));
    } else {
      this.showNoItems = true;
      this.searchCount.set(0);
      this.searchTotalCount.set(0);
    }
  }

  private convertToSearchModel(snapshot: InterestIndexSnapshot) : SearchColumnModel {
    return {label: snapshot.detail!.name!, columnName: snapshot.detail!.name!, columnType: "TEXT"};
  }


}
