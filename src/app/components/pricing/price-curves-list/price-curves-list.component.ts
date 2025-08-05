import {Component, DestroyRef, inject, signal} from '@angular/core';
import {CurveFileUploadComponent} from "../curve-file-upload/curve-file-upload.component";
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {PriceCurveSnapshotCollection} from '../model/price.model';
import {PriceCurveSearchComponent} from '../price-curve-search/price-curve-search.component';
import {PriceCurveSearchService} from '../services/price-curve-search.service';
import {PriceIndexService} from '../../../services/price-index.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-price-curves-list',
  imports: [
    CurveFileUploadComponent,
    HasRolesDirective,
    PriceCurveSearchComponent,
    RouterLink,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './price-curves-list.component.html',
  styleUrl: './price-curves-list.component.scss'
})
export class PriceCurvesListComponent {
  private priceIndexService = inject(PriceIndexService);
  priceCurveSearchService = inject(PriceCurveSearchService);

  selectedPriceCurveId: number | undefined = undefined;

  priceCurveCollection: PriceCurveSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch()
  }

  onSelected(entityId: number) {
    this.selectedPriceCurveId = entityId;
  }

  private setNextAndPrev() {
    if (this.priceCurveCollection) {
      if (this.priceCurveCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.priceCurveCollection.start + this.priceCurveCollection.count;
      if (currentPosition < this.priceCurveCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.priceIndexService.findPriceCurves(
      this.priceCurveSearchService.searchCriteria(),
      0,
      this.priceCurveSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.priceCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.priceCurveCollection!.start + this.priceCurveCollection!.count;

    let subscription  =this.priceIndexService.findPriceCurves(
      this.priceCurveSearchService.searchCriteria(),
      currentPosition,
      this.priceCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.priceCurveCollection!.start - this.priceCurveCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.priceIndexService.findPriceCurves(
      this.priceCurveSearchService.searchCriteria(),
      newStart,
      this.priceCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceCurveCollection = data;
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

  onFileUploadShow() {
    this.showFileUpload.set(true);
  }

  onFileUploadClose() {
    this.showFileUpload.set(false);
  }


}
