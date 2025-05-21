import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import { DealService } from '../services/deal.service';
import {DealSnapshot} from '../model/deal.model';
import {SearchComponent} from '../../shared/search/search.component';
import {SearchColumnModel, SearchConfig} from '../../../models/search-column.model';
import {Router, RouterLink} from '@angular/router';
import {DealSnapshotCollection} from '../model/dealSnapshotCollection';

@Component({
  selector: 'app-deals',
  templateUrl: './list-deals.component.html',
  imports: [
    SearchComponent
  ],
  styleUrls: ['./list-deals.component.css']
})
export class ListDealsComponent implements OnInit {
  private readonly dealService = inject(DealService);
  private router = inject(Router);

  selectedDeal : DealSnapshot | undefined = undefined;

  selectionCriteria:string = 'default';
  showNext: boolean = false;
  showPrev: boolean = false;

  dealSnapshotCollection: DealSnapshotCollection | null = null;

  public dealSearchColumns: SearchColumnModel[] = [
    { label: 'None', columnName: "none", columnType: "TEXT"},
    { label: 'Buy/Sell', columnName: "buySellCode", columnType: "CODE", codeEntityName: 'BuySellCode' },
    { label: 'Commodity', columnName: "commodity", columnType: "TEXT" },
    { label: 'Deal Status', columnName: "dealStatus", columnType: "CODE", codeEntityName: 'DealStatusCode' },
    { label: 'Ticket No', columnName: "ticketNo", columnType: "TEXT" },
    { label: 'Start Date', columnName: "startDate", columnType: "TEXT" },
    { label: 'End Date', columnName: "endDate", columnType: "TEXT" },
  ];

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    let subscription = this.dealService.listDeals().subscribe({
     next: (data) => {
       this.dealSnapshotCollection = data;
       this.setNextAndPrev()
     },
     error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  private setNextAndPrev() {
    if (this.dealSnapshotCollection) {
      if (this.dealSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.dealSnapshotCollection.start + this.dealSnapshotCollection.count;
      if (currentPosition < this.dealSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }


  onEdit(dealId: number, dealType: string) {
    this.router.navigate(['deals', 'edit'], {queryParams: {dealId: dealId}});

  }

  onSearch(searchConfig: SearchConfig) {
    this.selectionCriteria = searchConfig.searchCriteria;
    let subscription = this.dealService.findDeals(
      searchConfig.searchCriteria,
      0,
      searchConfig.limit).subscribe({
        next: (data) => {
          this.dealSnapshotCollection = data;
          this.setNextAndPrev();
        },
      error: err => {console.log(err)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  onNext() {
    let currentPosition = this.dealSnapshotCollection!.start + this.dealSnapshotCollection!.count;

    let subscription  =this.dealService.findDeals(
      this.selectionCriteria,
      currentPosition,
      this.dealSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.dealSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.dealSnapshotCollection!.start - this.dealSnapshotCollection!.count;

    let subscription  =this.dealService.findDeals(
      this.selectionCriteria,
      newStart,
      this.dealSnapshotCollection!.limit
    ).subscribe({
      next: (data) => {
        this.dealSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


}
