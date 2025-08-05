import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';


export interface PowerProfileDayDetail {
  dayOfWeek : number,
  hours :string[]
}


export interface PowerProfileDaySnapshot extends  AbstractSnapshot {
  detail : PowerProfileDayDetail

}

export interface PowerProfileIndexMappingDetail {
  powerFlowCodeValue : string | undefined
}


export interface PowerProfileIndexMappingSnapshot extends AbstractSnapshot {
  priceIndexId : EntityId,
  detail : PowerProfileIndexMappingDetail
}

export interface PowerProfileDetail {
  name : string | undefined,
  description : string | undefined
}

export interface PowerProfileSnapshot extends AbstractSnapshot {

  settledPriceIndexId? : EntityId,
  restOfMonthPriceIndexId? : EntityId,
  totalHours? : number,
  detail : PowerProfileDetail,
  profileDays? : PowerProfileDaySnapshot[],
  changedProfileDays? : PowerProfileDaySnapshot[],
  indexMappings? : PowerProfileIndexMappingSnapshot[],
  changedMappings? : PowerProfileIndexMappingSnapshot[],

}

export interface PowerProfileSnapshotCollection extends AbstractSnapshotCollection<PowerProfileSnapshot> {

}
