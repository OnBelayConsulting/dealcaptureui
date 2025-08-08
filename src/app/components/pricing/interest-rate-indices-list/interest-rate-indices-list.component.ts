import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {InterestIndexSearchComponent} from '../interest-index-search/interest-index-search.component';
import {InterestIndexService} from '../../../services/interest-rate-index.service';
import {InterestIndexSearchService} from '../services/interest-rate-index-search.service';
import {InterestIndexSnapshotCollection} from '../model/interest-rate.model';

@Component({
  selector: 'app-interest-rate-indices-list',
    imports: [
        InterestIndexSearchComponent,
        HasRolesDirective,
        RouterLink
    ],
  templateUrl: './interest-rate-indices-list.component.html',
  styleUrl: './interest-rate-indices-list.component.scss'
})
export class InterestRateIndicesListComponent {
  private interestIndexService = inject(InterestIndexService);
  interestIndexSearchService = inject(InterestIndexSearchService);

  selectedInterestIndexId: number | undefined = undefined;

  interestIndexSnapshotCollection: InterestIndexSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    let subscription = this.interestIndexService.listInterestIndices().subscribe({
      next: (data) => {
        this.interestIndexSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onSelected(entityId: number) {
    this.selectedInterestIndexId = entityId;
  }

  private setNextAndPrev() {
    if (this.interestIndexSnapshotCollection) {
      if (this.interestIndexSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.interestIndexSnapshotCollection.start + this.interestIndexSnapshotCollection.count;
      if (currentPosition < this.interestIndexSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.interestIndexService.findInterestIndices(
      this.interestIndexSearchService.searchCriteria(),
      0,
      this.interestIndexSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.interestIndexSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.interestIndexSnapshotCollection!.start + this.interestIndexSnapshotCollection!.count;

    let subscription  =this.interestIndexService.findInterestIndices(
      this.interestIndexSearchService.searchCriteria(),
      currentPosition,
      this.interestIndexSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.interestIndexSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.interestIndexSnapshotCollection!.start - this.interestIndexSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.interestIndexService.findInterestIndices(
      this.interestIndexSearchService.searchCriteria(),
      newStart,
      this.interestIndexSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.interestIndexSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onClose() {
    this.showSearchFields.set(false);
    this.startSearch();
  }

  onShowSearch() {
    this.showSearchFields.set(true);
  }

  onFileUploadShow() {
    this.showFileUpload.set(true);
  }

  onFileUploadClose() {
    this.showFileUpload.set(false);
  }


  onCancelSearch() {
    this.showSearchFields.set(false);
  }
}
