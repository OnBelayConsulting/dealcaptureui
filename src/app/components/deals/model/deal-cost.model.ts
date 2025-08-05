import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface DealCostSnapshot extends AbstractSnapshot{
  dealId? : EntityId,

  detail?: {
    costValue?: number | null;
    costNameCodeValue?: string | null;
    currencyCodeValue?: string | null;
    unitOfMeasureCodeValue?: string | null;
  }

}

export interface DealCostSnapshotCollection extends AbstractSnapshotCollection<DealCostSnapshot> {

}


