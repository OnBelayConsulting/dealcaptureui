import {Component, DestroyRef, inject, input, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchColumnModel} from '../../../models/search-column.model';
import {BusinessContactService} from '../../../services/business-contact.service';
import {BusinessContactSnapshot, BusinessContactSnapshotCollection, ContactType} from '../model/business-contact.model';

@Component({
  selector: 'app-business-contacts-quick-search',
    imports: [
        FormsModule
    ],
  templateUrl: './business-contacts-quick-search.component.html',
  styleUrl: '../../shared/search/quick-search.component.scss'
})
export class BusinessContactsQuickSearchComponent {
  private businessContactService = inject(BusinessContactService);
  destroyRef = inject(DestroyRef);

  result = output<SearchColumnModel>();
  cancel = output<string>();

  contactType = input.required<string> ();

  title = input<string>();
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

  private convertToSearchModel(contactSnapshot: BusinessContactSnapshot) : SearchColumnModel {
    return {label: this.buildLabel(contactSnapshot), columnName: contactSnapshot.detail.email, columnType: "TEXT"};
  }

  private buildLabel(contact: BusinessContactSnapshot) : string {
    return contact.detail.firstName + ' ' + contact.detail.lastName + ' (' + contact.detail.email + ')';
  }

  onSelect() {
    let selectedSearchColumnModel = this.searchResults().find(c => c.columnName === this.searchResult());
    this.result.emit(selectedSearchColumnModel!);
  }

  onCancel() {
    this.cancel.emit("cancel");
  }


  onSearch() {
    this.showNoItems = false;
    let criteria = 'WHERE ' + this.contactType() + ' eq true ';
    if (this.searchOn()) {
      criteria = criteria + " AND lastName startsWith '" + this.searchOn() + "'";
    }
      let subscription = this.businessContactService.findBusinessContacts(criteria, 0, 100).subscribe({
        next: (data) => {this.populateListBox(data)},
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());


  }

  private populateListBox(collection : BusinessContactSnapshotCollection) {
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
