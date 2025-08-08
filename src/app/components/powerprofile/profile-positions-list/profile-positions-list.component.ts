import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {PositionSearchComponent} from "../../positions/position-search/position-search.component";
import {RouterLink} from "@angular/router";
import {PositionService} from '../../../services/position.service';
import {PositionSearchService} from '../../positions/service/position-search.service';
import {DealPositionSnapshotCollection} from '../../positions/model/position.model';
import {PowerProfilePositionService} from '../../../services/profile-position.service';
import {PowerProfilePositionSearchService} from '../service/profile-position-search.service';
import {PowerProfilePositionSnapshotCollection} from '../model/profile-position.model';
import {ProfilePositionsSearchComponent} from '../profile-positions-search/profile-positions-search.component';

@Component({
  selector: 'app-profile-positions-list',
  imports: [
    HasRolesDirective,
    RouterLink,
    ProfilePositionsSearchComponent
  ],
  templateUrl: './profile-positions-list.component.html',
  styleUrl: './profile-positions-list.component.scss'
})
export class ProfilePositionsListComponent {
  private powerProfilePositionService = inject(PowerProfilePositionService);
  powerProfilePositionSearchService = inject(PowerProfilePositionSearchService);

  PowerProfilePositionSnapshotCollection: PowerProfilePositionSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch();
  }

  private setNextAndPrev() {
    if (this.PowerProfilePositionSnapshotCollection) {
      if (this.PowerProfilePositionSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.PowerProfilePositionSnapshotCollection.start + this.PowerProfilePositionSnapshotCollection.count;
      if (currentPosition < this.PowerProfilePositionSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.powerProfilePositionService.findPowerProfilePositions(
      this.powerProfilePositionSearchService.searchCriteria(),
      0,
      this.powerProfilePositionSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.PowerProfilePositionSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.PowerProfilePositionSnapshotCollection!.start + this.PowerProfilePositionSnapshotCollection!.count;

    let subscription  =this.powerProfilePositionService.findPowerProfilePositions(
      this.powerProfilePositionSearchService.searchCriteria(),
      currentPosition,
      this.PowerProfilePositionSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.PowerProfilePositionSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.PowerProfilePositionSnapshotCollection!.start - this.PowerProfilePositionSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.powerProfilePositionService.findPowerProfilePositions(
      this.powerProfilePositionSearchService.searchCriteria(),
      newStart,
      this.PowerProfilePositionSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.PowerProfilePositionSnapshotCollection = data;
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


  OnCancelSearch() {
    this.showSearchFields.set(false);
  }
}
