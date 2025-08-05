import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface PowerProfilePositionDetail {

  startDate : string | undefined,
  endDate : string | undefined,
  createdDateTime : string | undefined,
  valuedDateTime? : string | undefined,
  powerFlowCodeValue : string | undefined,
  numberOfHours : number | undefined,
  basisNo? : number | undefined,
  indexTypeCodeValue? : string | undefined,
  errorCode : string,
  errorMessage : string

}

export interface PowerProfilePositionSnapshot extends AbstractSnapshot {
  powerProfileId : EntityId,
  priceIndexId : EntityId,
  detail : PowerProfilePositionDetail,

}

export interface PowerProfilePositionSnapshotCollection extends AbstractSnapshotCollection<PowerProfilePositionSnapshot> {

}
