import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {BusinessContactSnapshotCollection} from '../model/business-contact.model';
import {BusinessContactSearchComponent} from '../business-contact-search/business-contact-search.component';
import {TransactionResult} from '../../../models/transactionresult.model';
import {BusinessContactSearchService} from '../services/business-contact-search.service';
import {BusinessContactService} from '../services/business-contact.service';

@Component({
  selector: 'app-list-business-contacts',
  imports: [
    BusinessContactSearchComponent
  ],
  templateUrl: './business-contacts-list.component.html',
  styleUrl: './business-contacts-list.component.scss'
})
export class BusinessContactsListComponent {
  businessContactService = inject(BusinessContactService);
  businessContactSearchService = inject(BusinessContactSearchService);

  selectedBusinessContactId: number | undefined = undefined;
  businessContactCollection :BusinessContactSnapshotCollection | undefined = undefined;
  showSearchFields = signal<boolean>(false);

  showSearchLabel = signal("Change");

  transactionResult : TransactionResult | undefined = undefined;

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);


  constructor() {
    effect(() => {
      let subscription  =this.businessContactService.findBusinessContacts(
        this.businessContactSearchService.searchCriteria(),
        0,
        this.businessContactSearchService.limitSetting()).subscribe({
        next: (data) => {
          this.businessContactCollection = data;
          this.setNextAndPrev()
        },
        error: err => console.log(err)
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());

    });
  }



  onSelected(entityId: number) {
    this.selectedBusinessContactId = entityId;
  }

  private setNextAndPrev() {
    if (this.businessContactCollection) {
      if (this.businessContactCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.businessContactCollection.start + this.businessContactCollection.count;
      if (currentPosition < this.businessContactCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }

  startSearch() {
    let subscription  =this.businessContactService.findBusinessContacts(
      this.businessContactSearchService.searchCriteria(),
      0,
      this.businessContactSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.businessContactCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.businessContactCollection!.start + this.businessContactCollection!.count;

    let subscription  =this.businessContactService.findBusinessContacts(
      this.businessContactSearchService.searchCriteria(),
      currentPosition,
      this.businessContactCollection!.limit
    ).subscribe({
      next: (data) => {
        this.businessContactCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.businessContactCollection!.start - this.businessContactCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.businessContactService.findBusinessContacts(
      this.businessContactSearchService.searchCriteria(),
      newStart,
      this.businessContactCollection!.limit
    ).subscribe({
      next: (data) => {
        this.businessContactCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }
  onClose() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change');
  }

  onToggleShowSearch() {
    this.showSearchFields.update( (val) => !val);
    if (!this.showSearchFields())
      this.showSearchLabel.set("Change");
    else
      this.showSearchLabel.set("Hide");
  }



}
