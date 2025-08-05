export interface SearchColumnModel {

  label : string;
  columnName: string;
  columnType:  "TEXT"| "NUMBER" | "DATE"| "CODE";
  codeEntityName?: string;
}

export interface SearchConfig {
searchCriteria: string;
limit: number;
}

export interface SearchOperator {
  label: string;
  value: string;
}
