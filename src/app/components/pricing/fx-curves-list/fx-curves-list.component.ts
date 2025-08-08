import {Component, DestroyRef, inject, signal} from '@angular/core';
import {CurveFileUploadComponent} from "../curve-file-upload/curve-file-upload.component";
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {FxIndexService} from '../../../services/fx-index.service';
import {FxCurveSearchComponent} from '../fx-curve-search/fx-curve-search.component';
import {FxCurveSearchService} from '../services/fx-curve-search.service';
import {FxCurveSnapshotCollection} from '../model/fx.model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-fx-curves-list',
  imports: [
    CurveFileUploadComponent,
    HasRolesDirective,
    FxCurveSearchComponent,
    RouterLink,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './fx-curves-list.component.html',
  styleUrl: './fx-curves-list.component.scss'
})
export class FxCurvesListComponent {
  private fxIndexService = inject(FxIndexService);
  fxCurveSearchService = inject(FxCurveSearchService);

  selectedFxCurveId: number | undefined = undefined;

  fxCurveCollection: FxCurveSnapshotCollection | undefined = undefined;

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
    if (this.fxCurveCollection) {
      if (this.fxCurveCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.fxCurveCollection.start + this.fxCurveCollection.count;
      if (currentPosition < this.fxCurveCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.fxIndexService.findFxCurves(
      this.fxCurveSearchService.searchCriteria(),
      0,
      this.fxCurveSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.fxCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.fxCurveCollection!.start + this.fxCurveCollection!.count;

    let subscription  =this.fxIndexService.findFxCurves(
      this.fxCurveSearchService.searchCriteria(),
      currentPosition,
      this.fxCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxCurveCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.fxCurveCollection!.start - this.fxCurveCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.fxIndexService.findFxCurves(
      this.fxCurveSearchService.searchCriteria(),
      newStart,
      this.fxCurveCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxCurveCollection = data;
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


  onSearchCancel() {
    this.showSearchFields.set(false);
  }
}
