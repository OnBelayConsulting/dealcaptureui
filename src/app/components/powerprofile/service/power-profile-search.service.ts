import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';

@Injectable({
  providedIn: 'root'
})
export class PowerProfileSearchService extends AbstractSearchService{


  constructor() {
  let searchColumns: SearchColumnModel[] = [
      { label: 'Name', columnName: "name", columnType: "TEXT"},
    ];

    super('name', searchColumns);
  }

}
