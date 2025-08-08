import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {CodeItem} from '../../../models/code.model';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {DealService} from '../../../services/deal.service';
import {DealSnapshotCollection} from '../model/dealSnapshotCollection';
import {DealPositionSnapshotCollection} from '../../positions/model/position.model';

@Injectable({
    providedIn: 'root'
  })
export class DealSearchService extends AbstractSearchService{

  dealService = inject(DealService);
  searchDealTypeFilter = signal<'default' | 'PhysicalDeal' | 'FinancialSwap' | 'VanillaOption'>('default');
  showNext = signal<boolean>(false);
  showPrev = signal<boolean>(false);

  dealSnapshotCollection = signal< DealSnapshotCollection | undefined>( undefined);

  destroyRef = inject(DestroyRef);


  dealStatusCodeItems: CodeItem[] = [
    {label: 'Pending', code: 'Pending'},
    {label: 'Verified', code: 'Verified'},
    {label: 'Suspended', code: 'Suspended'}
  ]


  buySellCodeItems: CodeItem[] = [
    {label: 'Buy', code: 'BUY'},
    {label: 'Sell', code: 'SELL'},
  ]


  commodityCodeItems: CodeItem[] = [
    {label: 'NATGAS', code: 'NATGAS'},
    {label: 'POWER', code: 'POWER'},
    {label: 'CRUDE', code: 'CRUDE'},
  ]

  constructor() {

  let mySearchColumns: SearchColumnModel[] = [
      { label: 'None', columnName: "none", columnType: "TEXT"},
      { label: 'Buy/Sell', columnName: "buySellCode", columnType: "CODE", codeEntityName: 'BuySellCode' },
      { label: 'Commodity', columnName: "commodity", columnType: "CODE", codeEntityName: 'CommodityCode' },
      { label: 'Deal Status', columnName: "dealStatus", columnType: "CODE", codeEntityName: 'DealStatusCode' },
      { label: 'Ticket No', columnName: "ticketNo", columnType: "TEXT" },
      { label: 'Start Date', columnName: "startDate", columnType: "TEXT" },
      { label: 'End Date', columnName: "endDate", columnType: "TEXT" },
    ];
    super('ticketNo', mySearchColumns);
    this.codeManagerMap.set("DealStatusCode", this.dealStatusCodeItems);
    this.codeManagerMap.set("BuySellCode", this.buySellCodeItems);
    this.codeManagerMap.set("CommodityCode", this.commodityCodeItems);
  }


  public updateDealTypeFilter(filter : 'default' | 'PhysicalDeal' | 'FinancialSwap' | 'VanillaOption') {
    this.searchDealTypeFilter.set(filter);
    switch (filter) {
      case "PhysicalDeal":
        this.filterCriteria.set("dealType eq 'PhysicalDeal'")
        break;
      case "FinancialSwap":
        this.filterCriteria.set("dealType eq 'FinancialSwap'")
        break;
      case "VanillaOption":
        this.filterCriteria.set("dealType eq 'VanillaOption'")
        break;
      default:
        this.filterCriteria.set('');
    }
  }

  private setNextAndPrev() {
    if (this.dealSnapshotCollection()) {
      if (this.dealSnapshotCollection()!.start === 0) {
        this.showPrev.set(false);
      } else {
        this.showPrev.set(true);
      }
      let currentPosition = this.dealSnapshotCollection()!.start + this.dealSnapshotCollection()!.count;
      if (currentPosition < this.dealSnapshotCollection()!.totalItems) {
        this.showNext.set(true);
      } else {
        this.showNext.set(false);
      }

    }
  }
  startSearch() {
    let subscription  =this.dealService.findDeals(
      this.searchCriteria(),
      0,
      this.limitSetting()).subscribe({
      next: (data) => {
        this.dealSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  public next() {
    let currentPosition = this.dealSnapshotCollection()!.start + this.dealSnapshotCollection()!.count;

    let subscription  =this.dealService.findDeals(
      this.searchCriteria(),
      currentPosition,
      this.dealSnapshotCollection()!.limit
    ).subscribe({
      next: (data) => {
        this.dealSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  public prev() {
    let newStart = this.dealSnapshotCollection()!.start - this.dealSnapshotCollection()!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.dealService.findDeals(
      this.searchCriteria(),
      newStart,
      this.dealSnapshotCollection()!.limit
    ).subscribe({
      next: (data) => {
        this.dealSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }




}
