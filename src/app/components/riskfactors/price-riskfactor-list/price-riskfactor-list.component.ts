import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from 'keycloak-angular';
import {PositionSearchComponent} from '../../positions/position-search/position-search.component';
import {RouterLink} from '@angular/router';
import {PriceRiskFactorService} from '../../../services/price-riskfactor.service';
import {PriceRiskFactorSearchService} from '../service/price-riskfactor-search.service';
import {PriceRiskFactorSnapshotCollection} from '../model/price-riskfactor.model';
import {PriceRiskFactorSearchComponent} from '../price-riskfactor-search/price-riskfactor-search.component';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-price-riskfactor-list',
  imports: [
    HasRolesDirective,
    RouterLink,
    PriceRiskFactorSearchComponent,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './price-riskfactor-list.component.html',
  styleUrl: './price-riskfactor-list.component.scss'
})
export class PriceRiskFactorListComponent {
  private priceRiskFactorService = inject(PriceRiskFactorService);
  priceRiskFactorSearchService = inject(PriceRiskFactorSearchService);

  priceRiskFactorSnapshotCollection: PriceRiskFactorSnapshotCollection | undefined = undefined;

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.startSearch();
  }

  private setNextAndPrev() {
    if (this.priceRiskFactorSnapshotCollection) {
      if (this.priceRiskFactorSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.priceRiskFactorSnapshotCollection.start + this.priceRiskFactorSnapshotCollection.count;
      if (currentPosition < this.priceRiskFactorSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.priceRiskFactorService.findPriceRiskFactors(
      this.priceRiskFactorSearchService.searchCriteria(),
      0,
      this.priceRiskFactorSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.priceRiskFactorSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.priceRiskFactorSnapshotCollection!.start + this.priceRiskFactorSnapshotCollection!.count;

    let subscription  =this.priceRiskFactorService.findPriceRiskFactors(
      this.priceRiskFactorSearchService.searchCriteria(),
      currentPosition,
      this.priceRiskFactorSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceRiskFactorSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.priceRiskFactorSnapshotCollection!.start - this.priceRiskFactorSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.priceRiskFactorService.findPriceRiskFactors(
      this.priceRiskFactorSearchService.searchCriteria(),
      newStart,
      this.priceRiskFactorSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceRiskFactorSnapshotCollection = data;
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
