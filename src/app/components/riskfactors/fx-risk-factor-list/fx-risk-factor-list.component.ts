import {Component, DestroyRef, inject, signal} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {FxRiskFactorSnapshotCollection} from '../model/fx-riskfactor.model';
import {FxRiskFactorSearchComponent} from '../fx-riskfactor-search/fx-risk-factor-search.component';
import {FxRiskFactorService} from '../service/fx-riskfactor.service';
import {FxRiskFactorSearchService} from '../service/fx-riskfactor-search.service';

@Component({
  selector: 'app-fx-riskfactor-list',
    imports: [
        DatePipe,
        DecimalPipe,
        FxRiskFactorSearchComponent,
        RouterLink
    ],
  templateUrl: './fx-risk-factor-list.component.html',
  styleUrl: './fx-risk-factor-list.component.scss'
})
export class FxRiskFactorListComponent {
  private fxRiskFactorService = inject(FxRiskFactorService);
  fxRiskFactorSearchService = inject(FxRiskFactorSearchService);

  fxRiskFactorSnapshotCollection: FxRiskFactorSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch();
  }

  private setNextAndPrev() {
    if (this.fxRiskFactorSnapshotCollection) {
      if (this.fxRiskFactorSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.fxRiskFactorSnapshotCollection.start + this.fxRiskFactorSnapshotCollection.count;
      if (currentPosition < this.fxRiskFactorSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.fxRiskFactorService.findFxRiskFactors(
      this.fxRiskFactorSearchService.searchCriteria(),
      0,
      this.fxRiskFactorSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.fxRiskFactorSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.fxRiskFactorSnapshotCollection!.start + this.fxRiskFactorSnapshotCollection!.count;

    let subscription  =this.fxRiskFactorService.findFxRiskFactors(
      this.fxRiskFactorSearchService.searchCriteria(),
      currentPosition,
      this.fxRiskFactorSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxRiskFactorSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.fxRiskFactorSnapshotCollection!.start - this.fxRiskFactorSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.fxRiskFactorService.findFxRiskFactors(
      this.fxRiskFactorSearchService.searchCriteria(),
      newStart,
      this.fxRiskFactorSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.fxRiskFactorSnapshotCollection = data;
        this.setNextAndPrev()
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


  onSearchCancel() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change');

  }

}
