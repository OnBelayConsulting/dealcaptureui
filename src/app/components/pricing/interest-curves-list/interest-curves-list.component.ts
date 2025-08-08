import {Component, DestroyRef, inject, signal} from '@angular/core';
import {CurveFileUploadComponent} from '../curve-file-upload/curve-file-upload.component';
import {HasRolesDirective} from 'keycloak-angular';
import {RouterLink} from '@angular/router';
import {InterestIndexService} from '../../../services/interest-rate-index.service';
import {InterestCurveSearchService} from '../services/interest-curve-search.service';
import {InterestCurveSnapshotCollection} from '../model/interest-rate.model';
import {InterestCurveSearchComponent} from '../interest-curve-search/interest-curve-search.component';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-interest-curves-list',
  imports: [
    CurveFileUploadComponent,
    InterestCurveSearchComponent,
    HasRolesDirective,
    RouterLink,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './interest-curves-list.component.html',
  styleUrl: './interest-curves-list.component.scss'
})
export class InterestCurvesListComponent {
  private interestIndexService = inject(InterestIndexService);
  interestCurveSearchService = inject(InterestCurveSearchService);

  selectedFxCurveId: number | undefined = undefined;

  interestCurveCollection: InterestCurveSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch()
  }

  onSelected(entityId: number) {
    this.selectedFxCurveId = entityId;
  }

  private setNextAndPrev() {
    if (this.interestCurveCollection) {
      if (this.interestCurveCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.interestCurveCollection.start + this.interestCurveCollection.count;
      if (currentPosition < this.interestCurveCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.interestIndexService.findInterestCurves(
      this.interestCurveSearchService.searchCriteria(),
      0,
      this.interestCurveSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.interestCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.interestCurveCollection!.start + this.interestCurveCollection!.count;

    let subscription  =this.interestIndexService.findInterestCurves(
      this.interestCurveSearchService.searchCriteria(),
      currentPosition,
      this.interestCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.interestCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.interestCurveCollection!.start - this.interestCurveCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.interestIndexService.findInterestCurves(
      this.interestCurveSearchService.searchCriteria(),
      newStart,
      this.interestCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.interestCurveCollection = data;
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
