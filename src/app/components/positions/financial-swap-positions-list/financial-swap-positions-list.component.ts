import {Component, computed, inject, OnInit} from '@angular/core';
import {PositionSearchService} from '../service/position-search.service';
import {FinancialSwapPositionSnapshot} from '../model/position.model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-financial-swap-positions-list',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './financial-swap-positions-list.component.html',
  styleUrl: './financial-swap-positions-list.component.scss'
})
export class FinancialSwapPositionsListComponent  implements OnInit{
  positionSearchService = inject(PositionSearchService);

  swapPositions = computed<FinancialSwapPositionSnapshot[] | undefined>( () => {
    if (this.positionSearchService.dealPositionSnapshotCollection())
      return this.positionSearchService.dealPositionSnapshotCollection()!.snapshots.map( (s) => s as FinancialSwapPositionSnapshot );
    else
      return undefined;
  });


  ngOnInit() {
    this.positionSearchService.startSearch();
  }


}
