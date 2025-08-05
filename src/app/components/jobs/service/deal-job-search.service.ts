import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';

@Injectable({
  providedIn: 'root'
})
export class DealJobSearchService extends AbstractSearchService{



  jobTypeCodeItems: CodeItem[] = [
    {label: 'DealPositionGeneration', code: 'DealPositionGeneration'},
    {label: 'DealPositionValuation', code: 'DealPositionValuation'},
    {label: 'PwrProfilePositionGeneration', code: 'PwrProfilePositionGeneration'},
    {label: 'PwrProfilePositionValuation', code: 'PwrProfilePositionValuation'},
    {label: 'PriceRiskFactorValuation', code: 'PriceRiskFactorValuation'},
    {label: 'FxRiskFactorValuation', code: 'FxRiskFactorValuation'},
  ]


  jobStatusCodeItems: CodeItem[] = [
    {label: 'Pending', code: 'Pending'},
    {label: 'Queued', code: 'Queued'},
    {label: 'Executing', code: 'Executing'},
    {label: 'Completed', code: 'Completed'},
    {label: 'Failed', code: 'Failed'},
  ]


  currencyCodeItems: CodeItem[] = [
    {label: 'CAD', code: 'CAD'},
    {label: 'USD', code: 'USD'},
  ]

  constructor() {
  let mySearchColumns: SearchColumnModel[] = [
      { label: 'Job Id', columnName: "jobId", columnType: "NUMBER" },
      { label: 'Job Type', columnName: "jobTypeCodeValue", columnType: "CODE", codeEntityName: 'JobTypeCode' },
      { label: 'Job Status', columnName: "jobStatusCodeValue", columnType: "CODE", codeEntityName : 'JobStatusCode'},
      { label: 'Created Date/Time', columnName: "createdDateTime", columnType: "DATE"},
      { label: 'From Date', columnName: "fromDate", columnType: "DATE" },
      { label: 'To Date', columnName: "toDate", columnType: "DATE" },
      { label: 'Currency', columnName: "currencyCode", columnType: "CODE", codeEntityName: 'CurrencyCode' },
    ];

    super('createdDateTime', mySearchColumns);
    this.codeManagerMap.set('JobTypeCode', this.jobTypeCodeItems);
    this.codeManagerMap.set('JobStatusCode', this.jobStatusCodeItems);
    this.codeManagerMap.set('CurrencyCode', this.currencyCodeItems);
  }

}
