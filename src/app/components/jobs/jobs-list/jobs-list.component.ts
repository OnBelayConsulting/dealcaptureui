import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {DealJobSearchComponent} from '../deal-job-search/deal-job-search.component';
import {DealJobSearchService} from '../service/deal-job-search.service';
import {DealJobService} from '../../../services/deal-job.service';
import {DealJobSnapshotCollection} from '../model/deal-job.model';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {InfoModalComponent} from '../../shared/info-modal/info-modal.component';

@Component({
  selector: 'app-jobs-list',
  imports: [
    DealJobSearchComponent,
    ReactiveFormsModule,
    DatePipe,
    InfoModalComponent
  ],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent {
  private dealJobService = inject(DealJobService);
  router = inject(Router);
  dealJobSearchService = inject(DealJobSearchService);

  selectedJobId: number | undefined = undefined;

  dealJobSnapshotCollection: DealJobSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showInformationDialog = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch();
  }

  onSelected(entityId: number) {
    this.selectedJobId = entityId;
  }

  private setNextAndPrev() {
    if (this.dealJobSnapshotCollection) {
      if (this.dealJobSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.dealJobSnapshotCollection.start + this.dealJobSnapshotCollection.count;
      if (currentPosition < this.dealJobSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.dealJobService.findJobs(
      this.dealJobSearchService.searchCriteria(),
      0,
      this.dealJobSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.dealJobSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.dealJobSnapshotCollection!.start + this.dealJobSnapshotCollection!.count;

    let subscription  =this.dealJobService.findJobs(
      this.dealJobSearchService.searchCriteria(),
      currentPosition,
      this.dealJobSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.dealJobSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.dealJobSnapshotCollection!.start - this.dealJobSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.dealJobService.findJobs(
      this.dealJobSearchService.searchCriteria(),
      newStart,
      this.dealJobSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.dealJobSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onCancel(jobId : number) {
    let subscription  =this.dealJobService.cancel(jobId).subscribe({
      next: (data) => {
        this.showInformationDialog.set(true);
        this.startSearch()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onDelete(jobId : number) {
    let subscription  =this.dealJobService.delete(jobId).subscribe({
      next: (data) => {
        this.showInformationDialog.set(true);
        this.startSearch()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }



  onClose() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change');
    this.startSearch();
  }

  onToggleShowSearch() {
    this.showSearchFields.update( (val) => !val);
    if (!this.showSearchFields())
      this.showSearchLabel.set("Change");
    else
      this.showSearchLabel.set("Hide");
  }

  onInfoCloseDialog() {
    this.showInformationDialog.set(false);

  }

  onCancelSearch() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change');

  }
}
