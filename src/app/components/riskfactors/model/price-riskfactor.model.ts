import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';
import {RiskFactorDetail} from './riskfactor.model';

export interface PriceRiskFactorSnapshot extends AbstractSnapshot {
  priceIndexId : EntityId,
  detail : RiskFactorDetail
}

export interface PriceRiskFactorSnapshotCollection extends AbstractSnapshotCollection<PriceRiskFactorSnapshot>{

}
