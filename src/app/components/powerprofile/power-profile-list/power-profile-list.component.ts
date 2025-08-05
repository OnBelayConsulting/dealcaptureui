import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {PowerProfileSearchComponent} from '../power-profile-search/power-profile-search.component';
import {PowerProfileService} from '../../../services/power-profile.service';
import {PowerProfileSearchService} from '../service/power-profile-search.service';
import {PowerProfileSnapshotCollection} from '../model/power-profile.model';

@Component({
  selector: 'app-power-profile-list',
    imports: [
        HasRolesDirective,
        PowerProfileSearchComponent,
        RouterLink
    ],
  templateUrl: './power-profile-list.component.html',
  styleUrl: './power-profile-list.component.scss'
})
export class PowerProfileListComponent {
  private powerProfileService = inject(PowerProfileService);
  powerProfileSearchService = inject(PowerProfileSearchService);

  selectedPowerProfileId: number | undefined = undefined;

  powerProfileCollection: PowerProfileSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  showFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch();
  }

  onSelected(entityId: number) {
    this.selectedPowerProfileId = entityId;
  }

  private setNextAndPrev() {
    if (this.powerProfileCollection) {
      if (this.powerProfileCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.powerProfileCollection.start + this.powerProfileCollection.count;
      if (currentPosition < this.powerProfileCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.powerProfileService.findPowerProfiles(
      this.powerProfileSearchService.searchCriteria(),
      0,
      this.powerProfileSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.powerProfileCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.powerProfileCollection!.start + this.powerProfileCollection!.count;

    let subscription  =this.powerProfileService.findPowerProfiles(
      this.powerProfileSearchService.searchCriteria(),
      currentPosition,
      this.powerProfileCollection!.limit
    ).subscribe({
      next: (data) => {
        this.powerProfileCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.powerProfileCollection!.start - this.powerProfileCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.powerProfileService.findPowerProfiles(
      this.powerProfileSearchService.searchCriteria(),
      newStart,
      this.powerProfileCollection!.limit
    ).subscribe({
      next: (data) => {
        this.powerProfileCollection = data;
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
