import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {CodeItem} from '../../../models/code.model';
import {SearchColumnModel} from '../../../models/search-column.model';

@Injectable({
  providedIn: 'root'
})
export class InterestIndexSearchService extends AbstractSearchService {

  constructor() {

  let searchColumns: SearchColumnModel[] = [
      { label: 'Description', columnName: "description", columnType: "TEXT" },
      { label: 'Name', columnName: "name", columnType: "TEXT" },
    ];
    super('name', searchColumns);
  }

}
