import {AbstractSnapshot, AbstractSnapshotCollection} from '../../../models/abstract-snapshot';

export interface PriceIndexSnapshot extends AbstractSnapshot {
  pricingLocationId: {
    id?: number | undefined,
    code?: string | undefined
  }
  detail?: {
    name?: string | undefined,
    description?: string | undefined,
    indexTypeValue?: string | undefined,
    currencyCodeValue?: string | undefined,
    unitOfCodeMeasureValue?: string | undefined,
    frequencyCodeValue?: string | undefined,
    benchSettlementRuleCodeValue?: string | undefined,
  }
}

export interface PriceIndexSnapshotCollection extends AbstractSnapshotCollection<PriceIndexSnapshot> {}
