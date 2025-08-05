import {computed, Injectable, signal} from '@angular/core';
import {AbstractSearchService} from '../../shared/search-services/abstract-search.service';
import {SearchColumnModel} from '../../../models/search-column.model';

@Injectable({
    providedIn: 'root'
  })
export class OrganizationSearchService extends AbstractSearchService {

  organizationRoleType = signal<string>('All');


  constructor() {
  let searchColumns: SearchColumnModel[] = [
      { label: 'None', columnName: "none", columnType: "TEXT"},
      { label: 'Short Name', columnName: "shortName", columnType: "TEXT" },
      { label: 'Legal Name', columnName: "legalName", columnType: "TEXT" },
    ];

    super('shortName', searchColumns);
  }
}
