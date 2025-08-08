import {Component, DestroyRef, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PositionService} from '../../../services/position.service';
import {PositionSearchService} from '../service/position-search.service';
import {HasRolesDirective} from 'keycloak-angular';
import {RouterLink} from '@angular/router';
import {PositionSearchComponent} from '../position-search/position-search.component';
import {DefaultPositionsListComponent} from '../default-positions-list/default-positions-list.component';
import {PhysicalPositionsListComponent} from '../physical-positions-list/physical-positions-list.component';
import {
  FinancialSwapPositionsListComponent
} from '../financial-swap-positions-list/financial-swap-positions-list.component';

@Component({
  selector: 'app-positions-list',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HasRolesDirective,
    RouterLink,
    PositionSearchComponent,
    DefaultPositionsListComponent,
    PhysicalPositionsListComponent,
    FinancialSwapPositionsListComponent
  ],
  templateUrl: './positions-list.component.html',
  styleUrl: './positions-list.component.scss'
})
export class PositionsListComponent {
  private positionService = inject(PositionService);
  positionSearchService = inject(PositionSearchService);

  showSearchFields = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  onClose() {
    this.showSearchFields.set(false);
    this.positionSearchService.startSearch();
  }

  onShowSearch() {
    this.showSearchFields.set(true);
  }


  onDownloadPositions() {
    this.positionService.fetchPositionsAsCSVFile("WHERE ", 0, 100);
  }

  setToAll() {
    this.positionSearchService.updateDealTypeFilter('default');
  }

  setToPhysicalDeals() {
    this.positionSearchService.updateDealTypeFilter('PhysicalDeal');

  }

  setToFinancialSwaps() {
    this.positionSearchService.updateDealTypeFilter('FinancialSwap');

  }

  onSearchCancel() {
    this.showSearchFields.set(false);
  }
}
