import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';

@Injectable({
  providedIn: 'root'
})
export class PowerProfilePositionSearchService extends AbstractSearchService{


  constructor() {
    let searchColumns: SearchColumnModel[] = [
      { label: 'Profile Name', columnName: "powerProfileName", columnType: "TEXT"},
      { label: 'Power Flow Code', columnName: "powerFlowCode", columnType: "TEXT"},
      { label: 'Created date/time', columnName: "createdDateTime", columnType: "DATE" },
      { label: 'Start date', columnName: "startDate", columnType: "DATE" },
      { label: 'End date', columnName: "endDate", columnType: "DATE" },
    ];

    super('powerProfileName', searchColumns);
  }

}
