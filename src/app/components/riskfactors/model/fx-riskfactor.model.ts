import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';
import {RiskFactorDetail} from './riskfactor.model';

export interface FxRiskFactorSnapshot extends AbstractSnapshot {
  fxIndexId : EntityId,
  detail : RiskFactorDetail
}

export interface FxRiskFactorSnapshotCollection extends AbstractSnapshotCollection<FxRiskFactorSnapshot>{

}
