import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {CodeItem} from '../../../models/code.model';
import {SearchColumnModel} from '../../../models/search-column.model';

@Injectable({
  providedIn: 'root'
})
export class FxCurveSearchService extends AbstractSearchService {




  frequencyCodeItems: CodeItem[] = [
    {label: 'Hourly', code: 'H'},
    {label: 'Daily', code: 'D'},
    {label: 'Monthly', code: 'M'},
  ]


  constructor() {

    let mySearchColumns :SearchColumnModel[]  = [
      { label: 'F/X Index Name', columnName: "indexName", columnType: "TEXT"},
      { label: 'Curve Date', columnName: "curveDate", columnType: "DATE" },
      { label: 'Frequency', columnName: "frequencyCode", columnType: "CODE", codeEntityName: 'FrequencyCode' },
    ];
    super('curveDate', mySearchColumns);
    this.codeManagerMap.set('FrequencyCode', this.frequencyCodeItems);
  }

}
