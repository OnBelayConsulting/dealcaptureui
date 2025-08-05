import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';

@Injectable({
  providedIn: 'root'
})
export class PriceRiskFactorSearchService extends AbstractSearchService{



  constructor() {
  let searchColumns: SearchColumnModel[] = [
      { label: 'Index Name', columnName: "indexName", columnType: "TEXT"},
      { label: 'Market date/time', columnName: "createdDateTime", columnType: "DATE" },
    ];

    super('indexName', searchColumns);
  }

}
