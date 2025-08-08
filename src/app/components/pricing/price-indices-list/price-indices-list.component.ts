import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {PriceIndexSearchComponent} from '../price-index-search/price-index-search.component';
import {PriceIndexService} from '../../../services/price-index.service';
import {PriceIndexSearchService} from '../services/price-index-search.service';
import {PriceIndexSnapshotCollection} from '../model/price.model';
import {RouterLink} from '@angular/router';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-list-price-indices',
  imports: [
    PriceIndexSearchComponent,
    RouterLink,
    HasRolesDirective
  ],
  templateUrl: './price-indices-list.component.html',
  styleUrl: './price-indices-list.component.scss'
})
export class PriceIndicesListComponent implements OnInit {
  private priceIndexService = inject(PriceIndexService);
  priceIndexSearchService = inject(PriceIndexSearchService);

  selectedPriceIndexId: number | undefined = undefined;

  priceIndexCollection: PriceIndexSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    let subscription = this.priceIndexService.listPriceIndices().subscribe({
      next: (data) => {
        this.priceIndexCollection = data;
        this.setNextAndPrev()
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onSelected(entityId: number) {
    this.selectedPriceIndexId = entityId;
  }

  private setNextAndPrev() {
    if (this.priceIndexCollection) {
      if (this.priceIndexCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.priceIndexCollection.start + this.priceIndexCollection.count;
      if (currentPosition < this.priceIndexCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.priceIndexService.findPriceIndices(
      this.priceIndexSearchService.searchCriteria(),
      0,
      this.priceIndexSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.priceIndexCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.priceIndexCollection!.start + this.priceIndexCollection!.count;

    let subscription  =this.priceIndexService.findPriceIndices(
      this.priceIndexSearchService.searchCriteria(),
      currentPosition,
      this.priceIndexCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceIndexCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.priceIndexCollection!.start - this.priceIndexCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.priceIndexService.findPriceIndices(
      this.priceIndexSearchService.searchCriteria(),
      newStart,
      this.priceIndexCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceIndexCollection = data;
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
