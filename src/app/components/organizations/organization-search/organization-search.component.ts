import {Component, EventEmitter, input, Output,  signal, effect, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchColumnModel, SearchOperator} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';
import {OrganizationSearchService} from '../services/list-organizations.service';

@Component({
  selector: 'app-org-search',
  imports: [
    FormsModule
  ],
  templateUrl: './organization-search.component.html',
  styleUrl: './organization-search.component.scss'
})
export class OrganizationSearchComponent {

  organizationSearchService = inject(OrganizationSearchService);

  localSelectionCriteria = signal<string>("");
  localOrderByCriteria = signal<string>("");
  localSearchLimit = signal<number>(100);
  localOrgRoleTypeSelected = signal<string>('all');

  searchOperator  = signal<string>("");
  searchValue = signal<string>('');

  searchField = signal<string>("");


  searchColumn = signal<SearchColumnModel | undefined>(undefined);

  searchCodes = signal<CodeItem[] | undefined>(undefined);

  searchOperatorListItems = signal<SearchOperator[] | undefined>(undefined);

  @Output() close = new EventEmitter<void>();

  constructor() {

    this.localSelectionCriteria.set(this.organizationSearchService.selectionCriteria());
    this.localOrderByCriteria.set(this.organizationSearchService.orderByCriteria());
    this.localSearchLimit.set(this.organizationSearchService.limitSetting());

    effect(() => {
      if (this.searchField()) {
        console.log("field selected: " + this.searchField());
        this.searchColumn.set( this.organizationSearchService.searchColumns.find( (col) => col.columnName === this.searchField()));
        this.searchOperatorListItems.set(this.organizationSearchService.getSearchOperators(this.searchColumn()!.columnType));
        if (this.searchColumn()?.columnType === "CODE") {
          this.searchCodes.set(this.organizationSearchService.getCodeItems(this.searchColumn()?.codeEntityName!));
        } else {
          this.searchCodes.set(undefined);
        }
      }
    });

  }

  onAddOpenBracket() {
    this.localSelectionCriteria.update(criteria => criteria + "(");
  }

  onAddCloseBracket() {
    this.localSelectionCriteria.update(criteria => criteria + ")");
  }

  onAddAnd() {
    this.localSelectionCriteria.update(criteria => criteria + " AND ");
  }

  onAddExpression() {
    let stringBuilder = "";
    if (this.searchColumn) {
      stringBuilder = stringBuilder +  this.searchColumn()?.columnName;
    }
    if (this.searchOperator()) {
      stringBuilder = stringBuilder + " " + this.searchOperator();
    }
    if (this.searchValue()) {
      stringBuilder = stringBuilder + " '" + this.searchValue() +"'";
    }
    console.log(stringBuilder);
    if (this.localSelectionCriteria() === 'default') {
      this.localSelectionCriteria.set(stringBuilder);
    } else {
      this.localSelectionCriteria.update((criteria) => criteria + stringBuilder);
    }
    this.searchOperator.set("");
    this.searchValue.set("");
    this.searchField.set("");
    this.searchColumn.set(undefined);
    this.searchCodes.set(undefined);
  }

  onReset() {
    this.localSelectionCriteria.set(this.organizationSearchService.selectionCriteria());
    this.localOrderByCriteria.set(this.organizationSearchService.orderByCriteria());
    this.localSearchLimit.set(this.organizationSearchService.limitSetting());
  }

  onClose() {
    this.organizationSearchService.selectionCriteria.set(this.localSelectionCriteria());
    this.organizationSearchService.orderByCriteria.set(this.localOrderByCriteria());
    this.organizationSearchService.limitSetting.set(this.localSearchLimit());
    this.organizationSearchService.organizationRoleType.set(this.localOrgRoleTypeSelected());
    this.close.emit();
  }
}
