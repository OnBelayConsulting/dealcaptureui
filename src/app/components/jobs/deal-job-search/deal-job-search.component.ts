import {Component, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchColumnModel, SearchOperator} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';
import {DealJobSearchService} from '../service/deal-job-search.service';

@Component({
  selector: 'app-deal-job-search',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './deal-job-search.component.html',
  styleUrl: './deal-job-search.component.scss'
})
export class DealJobSearchComponent {

  dealJobSearchService = inject(DealJobSearchService);

  localSelectionCriteria = signal<string>("");
  localOrderByCriteria = signal<string>("");
  localSearchLimit = signal<number>(100);

  searchOperator  = signal<string>("");
  searchValue = signal<string>('');

  searchField = signal<string>("");


  searchColumn = signal<SearchColumnModel | undefined>(undefined);

  searchCodes = signal<CodeItem[] | undefined>(undefined);

  searchOperatorListItems = signal<SearchOperator[] | undefined>(undefined);

  @Output() close = new EventEmitter<void>();

  constructor() {

    this.localSelectionCriteria.set(this.dealJobSearchService.selectionCriteria());
    this.localOrderByCriteria.set(this.dealJobSearchService.orderByCriteria());
    this.localSearchLimit.set(this.dealJobSearchService.limitSetting());

    effect(() => {
      if (this.searchField()) {
        console.log("field selected: " + this.searchField());
        this.searchColumn.set( this.dealJobSearchService.searchColumns.find( (col) => col.columnName === this.searchField()));
        this.searchOperatorListItems.set(this.dealJobSearchService.getSearchOperators(this.searchColumn()!.columnType));
        if (this.searchColumn()?.columnType === "CODE") {
          this.searchCodes.set(this.dealJobSearchService.getCodeItems(this.searchColumn()?.codeEntityName!));
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
    this.localSelectionCriteria.set(this.dealJobSearchService.selectionCriteria());
    this.localOrderByCriteria.set(this.dealJobSearchService.orderByCriteria());
    this.localSearchLimit.set(this.dealJobSearchService.limitSetting());
  }

  onClose() {
    this.dealJobSearchService.selectionCriteria.set(this.localSelectionCriteria());
    this.dealJobSearchService.orderByCriteria.set(this.localOrderByCriteria());
    this.dealJobSearchService.limitSetting.set(this.localSearchLimit());
    this.close.emit();
  }

}
