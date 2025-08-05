export interface EntityId {
  id?: number | null;
  code?: string | null;
  description?: string | null
}

export interface ErrorHoldingSnapshot {
  errorCode?: string;
  errorMessage?:string;
  parameters?: string[];
  isPermissionException?: boolean;

}



export interface AbstractSnapshot extends ErrorHoldingSnapshot {
  entityState?: string;
  version?: number;

  entityId?: EntityId

}

export interface AbstractSnapshotCollection<T> extends ErrorHoldingSnapshot {
  start: number;
  limit: number;
  count: number;
  totalItems: number;
  name: string;
  snapshots: [T];
}
