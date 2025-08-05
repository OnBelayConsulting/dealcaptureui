import { Injectable } from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {CodeItem} from '../../../models/code.model';
import {SearchColumnModel} from '../../../models/search-column.model';

@Injectable({
  providedIn: 'root'
})
export class PriceIndexSearchService extends AbstractSearchService {




  indexTypeCodeItems: CodeItem[] = [
    {label: 'Hub', code: 'Hub'},
    {label: 'Basis', code: 'Basis'},
  ]


  constructor() {

  let searchColumns: SearchColumnModel[] = [
      { label: 'None', columnName: "none", columnType: "TEXT"},
      { label: 'Description', columnName: "description", columnType: "TEXT" },
      { label: 'Name', columnName: "name", columnType: "TEXT" },
      { label: 'Index Type', columnName: "indexType", columnType: "CODE", codeEntityName: 'IndexTypeCode' },
    ];
    super('name', searchColumns);
    this.codeManagerMap.set('IndexTypeCode', this.indexTypeCodeItems);
  }

}
