import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface DealJobDetail {
  jobTypeCodeValue : string,
  jobStatusCodeValue:  string | undefined,
  queryText:  string | undefined,
  domainId?: number | undefined,
  currencyCodeValue :  string | undefined,
  createdDateTime:  string | undefined,
  fromDate :  string | undefined,
  toDate :  string | undefined,
  positionGenerationIdentifier? :  string | undefined,
  queuedDateTime? : string | undefined,
  executionStartDateTime? : string | undefined,
  executionEndDateTime? : string | undefined,
  volumeUnitOfMeasure? : string | undefined,
  valuationDateTime? : string | undefined,
  errorCode? : string | undefined,
  errorMessage? : string | undefined,
}


export interface DealJobSnapshot extends AbstractSnapshot {
  dependsOnId? : EntityId,
  detail : DealJobDetail

}


export interface DealJobSnapshotCollection extends AbstractSnapshotCollection<DealJobSnapshot> {

}
