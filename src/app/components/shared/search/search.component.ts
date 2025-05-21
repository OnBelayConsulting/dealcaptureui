import {Component, EventEmitter, input, Output,  signal, effect, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchColumnModel, SearchConfig, SearchOperator} from '../../../models/search-column.model';
import {CodeItem} from '../../../models/code.model';
import {SearchService} from '../service/search.service';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  showSearchFields = signal<boolean>(false);

  showSearchLabel = signal("Show");
  searchOperator  = signal<string>("");
  searchValue = signal<string>('');

  searchField = signal<string>("");

  searchService = inject(SearchService);

  searchLimit: number = 100;

  searchColumn = signal<SearchColumnModel | undefined>(undefined);

  searchCriteria = signal<string>("");
  orderBy = signal<string>("");

  searchColumns = input.required<SearchColumnModel[]>();

  searchCodes = signal<CodeItem[] | undefined>(undefined);

  searchOperatorListItems = signal<SearchOperator[] | undefined>(undefined);

  @Output() search = new EventEmitter<SearchConfig>();

  constructor() {

    effect(() => {
      if (this.searchField()) {
        console.log("field selected: " + this.searchField());
        this.searchColumn.set( this.searchColumns().find( (col) => col.columnName === this.searchField()));
        this.searchOperatorListItems.set(this.searchService.getSearchOperators(this.searchColumn()!.columnType));
        if (this.searchColumn()?.columnType === "CODE") {
          this.searchCodes.set(this.searchService.getCodeItems(this.searchColumn()?.codeEntityName!));
        } else {
          this.searchCodes.set(undefined);
        }
      }
    });

  }

  onAddOpenBracket() {
    this.searchCriteria.update(criteria => criteria + "(");
  }

  onAddCloseBracket() {
    this.searchCriteria.update(criteria => criteria + ")");
  }

  onAddAnd() {
    this.searchCriteria.update(criteria => criteria + " AND ");
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
    this.searchCriteria.update( (criteria) => criteria + stringBuilder);
    this.searchOperator.set("");
    this.searchValue.set("");
    this.searchField.set("");
    this.searchColumn.set(undefined);
    this.searchCodes.set(undefined);
  }

  onSearch() {
    let builder: string = "";
    if (this.searchCriteria() && this.searchCriteria().length > 0) {
      builder = 'WHERE ' + this.searchCriteria();
      if (this.orderBy() && this.orderBy().length > 0) {
        builder = builder + " ORDER BY " + this.orderBy();
      }
    } else {
        if (this.orderBy() && this.orderBy().length > 0) {
          builder = " ORDER BY " + this.orderBy();
        }
    }
    if (!builder) {
      builder = 'WHERE ';
    }
    this.search.emit({searchCriteria: builder, limit: this.searchLimit});
  }

  onToggleShowSearch() {
    this.showSearchFields.update( (val) => !val);
    if (!this.showSearchFields())
      this.showSearchLabel.set("Show");
    else
      this.showSearchLabel.set("Hide");
  }
}
