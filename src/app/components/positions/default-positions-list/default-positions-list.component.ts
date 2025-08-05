import {Component, inject, OnInit} from '@angular/core';
import {PositionSearchService} from '../service/position-search.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-default-positions-list',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './default-positions-list.component.html',
  styleUrl: './default-positions-list.component.scss'
})
export class DefaultPositionsListComponent implements OnInit {
  positionSearchService = inject(PositionSearchService);


  ngOnInit() {
    this.positionSearchService.startSearch();
  }


  protected readonly PositionSearchService = PositionSearchService;
}
