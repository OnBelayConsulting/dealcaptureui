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
import {PriceIndexService} from '../price-index.service';
import {PriceIndexSnapshot, PriceIndexSnapshotCollection} from '../model/price.model';

@Component({
  selector: 'app-price-index-search-popup',
  imports: [FormsModule],
  templateUrl: './search-price-index.component.html',
  styleUrl: './search-price-index.component.scss'
})
export class SearchPriceIndexComponent implements OnInit {
  private priceIndexService = inject(PriceIndexService);
  destroyRef = inject(DestroyRef);

  result = output<string>();
  cancel = output<string>();

  title = input<string>();
  searchOn = signal<string>('');

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
  }

  private populateListBox(collection : PriceIndexSnapshotCollection) {
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

  private convertToSearchModel(snapshot: PriceIndexSnapshot) : SearchColumnModel {
    return {label: snapshot.detail!.name!, columnName: snapshot.detail!.name!, columnType: "TEXT"};
  }

  onSelect() {
    this.result.emit(this.searchResult());
  }


  onCancel() {
    this.cancel.emit('cancel');
  }


  onSearch() {
    this.showNoItems = false;
    if (this.searchOn() && this.searchOn().length > 0) {
      let selectionCriteria = "WHERE name startsWith '" + this.searchOn + "'";
      let subscription = this.priceIndexService.findPriceIndices(selectionCriteria, 0, 100).subscribe({
        next: (data) => {this.populateListBox(data)},
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());

    }

  }
}
