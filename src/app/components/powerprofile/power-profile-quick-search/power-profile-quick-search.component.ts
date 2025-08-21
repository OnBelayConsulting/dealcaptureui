import {Component, DestroyRef, inject, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchColumnModel} from '../../../models/search-column.model';
import {PowerProfileService} from '../service/power-profile.service';
import {EntityId, EntityListItemCollection} from '../../../models/abstract-snapshot';

@Component({
  selector: 'app-power-profile-quick-search',
    imports: [
        FormsModule
    ],
  templateUrl: './power-profile-quick-search.component.html',
  styleUrl: './power-profile-quick-search.component.scss'
})
export class PowerProfileQuickSearchComponent {
  private powerProfileService = inject(PowerProfileService);
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
    let subscription = this.powerProfileService.findPowerProfilesEntityIds(selectionCriteria, 0, 100).subscribe({
      next: (data) => {this.populateListBox(data)},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  private populateListBox(collection : EntityListItemCollection) {
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

  private convertToSearchModel(entityId: EntityId) : SearchColumnModel {
    return {label: entityId.code!, columnName: entityId.code!, columnType: "TEXT"};
  }


}
