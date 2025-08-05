import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface RiskFactorDetail {
  value? : number | undefined,
  marketDate : string,
  hourEnding? : number | undefined,
  createdDateTime : string | undefined,
  errorCode? : string | undefined,
  errorMessage? : string | undefined
}

export interface PriceRiskFactorSnapshot extends AbstractSnapshot {
  priceIndexId : EntityId,
  detail : RiskFactorDetail
}

export interface PriceRiskFactorSnapshotCollection extends AbstractSnapshotCollection<PriceRiskFactorSnapshot>{

}
