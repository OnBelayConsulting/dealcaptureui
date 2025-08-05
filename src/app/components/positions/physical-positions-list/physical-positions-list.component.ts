import {Component, computed, inject, OnInit} from '@angular/core';
import {PositionSearchService} from '../service/position-search.service';
import {PhysicalPositionSnapshot} from '../model/position.model';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-physical-positions-list',
  templateUrl: './physical-positions-list.component.html',
  imports: [
    DecimalPipe,
    DatePipe
  ],
  styleUrl: './physical-positions-list.component.scss'
})
export class PhysicalPositionsListComponent implements OnInit {
  positionSearchService = inject(PositionSearchService);

  physicalPositions = computed<PhysicalPositionSnapshot[] | undefined>( () => {
    if (this.positionSearchService.dealPositionSnapshotCollection())
        return this.positionSearchService.dealPositionSnapshotCollection()!.snapshots.map( (s) => s as PhysicalPositionSnapshot );
    else
       return undefined;
  });


  ngOnInit() {
    this.positionSearchService.startSearch();
  }

}


