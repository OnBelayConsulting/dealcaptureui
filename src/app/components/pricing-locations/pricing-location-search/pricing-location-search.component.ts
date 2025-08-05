import {Component, DestroyRef, inject, input, output, signal} from '@angular/core';
import {SearchColumnModel} from '../../../models/search-column.model';
import {PricingLocationService} from '../../../services/pricing-location.service';
import {PricingLocationSnapshot, PricingLocationSnapshotCollection} from '../model/pricing-location.model';

@Component({
  selector: 'app-pricing-location-search',
  imports: [],
  templateUrl: './pricing-location-search.component.html',
  styleUrl: './pricing-location-search.component.scss'
})
export class PricingLocationSearchComponent {
  private pricingLocationService = inject(PricingLocationService);
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

  private populateListBox(collection : PricingLocationSnapshotCollection) {
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

  private convertToSearchModel(snapshot: PricingLocationSnapshot) : SearchColumnModel {
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
      let subscription = this.pricingLocationService.findPricingLocations(selectionCriteria, 0, 100).subscribe({
        next: (data) => {this.populateListBox(data)},
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());

    }

  }

}
