import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {FxIndexService} from '../../../services/fx-index.service';
import {FxIndexSearchService} from '../services/fx-index-search.service';
import {FxIndexSnapshotCollection} from '../model/fx.model';
import {FxIndexSearchComponent} from '../fx-index-search/fx-index-search.component';

@Component({
  selector: 'app-fx-indices-list',
  imports: [
    HasRolesDirective,
    RouterLink,
    FxIndexSearchComponent
  ],
  templateUrl: './fx-indices-list.component.html',
  styleUrl: './fx-indices-list.component.scss'
})
export class FxIndicesListComponent {
  private fxIndexService = inject(FxIndexService);
  fxIndexSearchService = inject(FxIndexSearchService);

  selectedFxIndexId: number | undefined = undefined;

  fxIndexCollection: FxIndexSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    let subscription = this.fxIndexService.listFxIndices().subscribe({
      next: (data) => {
        this.fxIndexCollection = data;
        this.setNextAndPrev()
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onSelected(entityId: number) {
    this.selectedFxIndexId = entityId;
  }

  private setNextAndPrev() {
    if (this.fxIndexCollection) {
      if (this.fxIndexCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.fxIndexCollection.start + this.fxIndexCollection.count;
      if (currentPosition < this.fxIndexCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.fxIndexService.findFxIndices(
      this.fxIndexSearchService.searchCriteria(),
      0,
      this.fxIndexSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.fxIndexCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.fxIndexCollection!.start + this.fxIndexCollection!.count;

    let subscription  =this.fxIndexService.findFxIndices(
      this.fxIndexSearchService.searchCriteria(),
      currentPosition,
      this.fxIndexCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxIndexCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.fxIndexCollection!.start - this.fxIndexCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.fxIndexService.findFxIndices(
      this.fxIndexSearchService.searchCriteria(),
      newStart,
      this.fxIndexCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxIndexCollection = data;
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
