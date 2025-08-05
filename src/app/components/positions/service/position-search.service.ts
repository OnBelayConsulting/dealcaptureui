import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';
import {PositionService} from '../../../services/position.service';
import {DealPositionSnapshotCollection} from '../model/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionSearchService extends AbstractSearchService{

  positionService = inject(PositionService);
  searchDealTypeFilter = signal<'default' | 'PhysicalDeal' | 'FinancialSwap'>('default');
  showNext = signal<boolean>(false);
  showPrev = signal<boolean>(false);

  destroyRef = inject(DestroyRef);

  dealPositionSnapshotCollection = signal< DealPositionSnapshotCollection | undefined>( undefined);

  frequencyCodeItems: CodeItem[] = [
    {label: 'Hourly', code: 'H'},
    {label: 'Daily', code: 'D'},
    {label: 'Monthly', code: 'M'},
  ]


  currencyCodeItems: CodeItem[] = [
    {label: 'CAD', code: 'CAD'},
    {label: 'USD', code: 'USD'},
  ]


  constructor() {
  let searchColumns: SearchColumnModel[] = [
      { label: 'Company Name', columnName: "companyShortName", columnType: "TEXT"},
      { label: 'Counterparty Name', columnName: "counterpartyShortName", columnType: "TEXT"},
      { label: 'Deal type', columnName: "dealType", columnType: "TEXT"},
      { label: 'Deal ticket No', columnName: "ticketNo", columnType: "DATE" },
      { label: 'Created date/time', columnName: "createdDateTime", columnType: "DATE" },
      { label: 'Start date', columnName: "startDate", columnType: "DATE" },
      { label: 'End date', columnName: "endDate", columnType: "DATE" },
      { label: 'Frequency', columnName: "frequencyCode", columnType: "CODE", codeEntityName: 'FrequencyCode' },
      { label: 'Currency', columnName: "currencyCode", columnType: "CODE", codeEntityName: 'CurrencyCode' },
    ];

    super('startDate', searchColumns);
    this.codeManagerMap.set('FrequencyCode', this.frequencyCodeItems);
    this.codeManagerMap.set('CurrencyCode', this.currencyCodeItems);
  }

  public updateDealTypeFilter(filter : 'default' | 'PhysicalDeal' | 'FinancialSwap') {
    this.searchDealTypeFilter.set(filter);
    switch (filter) {
      case "PhysicalDeal":
        this.filterCriteria.set("dealType eq 'PhysicalDeal'")
        break;
      case "FinancialSwap":
        this.filterCriteria.set("dealType eq 'FinancialSwap'")
        break;
      default:
        this.filterCriteria.set('');
    }
  }


  private setNextAndPrev() {
    if (this.dealPositionSnapshotCollection()) {
      if (this.dealPositionSnapshotCollection()!.start === 0) {
        this.showPrev.set(false);
      } else {
        this.showPrev.set(true);
      }
      let currentPosition = this.dealPositionSnapshotCollection()!.start + this.dealPositionSnapshotCollection()!.count;
      if (currentPosition < this.dealPositionSnapshotCollection()!.totalItems) {
        this.showNext.set(true);
      } else {
        this.showNext.set(false);
      }

    }
  }
  startSearch() {
    let subscription  =this.positionService.findPositions(
      this.searchCriteria(),
      0,
      this.limitSetting()).subscribe({
      next: (data) => {
        this.dealPositionSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  public next() {
    let currentPosition = this.dealPositionSnapshotCollection()!.start + this.dealPositionSnapshotCollection()!.count;

    let subscription  =this.positionService.findPositions(
      this.searchCriteria(),
      currentPosition,
      this.dealPositionSnapshotCollection()!.limit
    ).subscribe({
      next: (data) => {
        this.dealPositionSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  public prev() {
    let newStart = this.dealPositionSnapshotCollection()!.start - this.dealPositionSnapshotCollection()!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.positionService.findPositions(
      this.searchCriteria(),
      newStart,
      this.dealPositionSnapshotCollection()!.limit
    ).subscribe({
      next: (data) => {
        this.dealPositionSnapshotCollection.set(data);
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }



}
