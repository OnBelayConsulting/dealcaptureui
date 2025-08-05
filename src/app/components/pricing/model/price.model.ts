import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface PriceIndexSnapshot extends AbstractSnapshot {
  pricingLocationId: EntityId,

  benchIndexId?: EntityId,

  baseIndexId?: EntityId,

  detail?: {
    name?: string | undefined | null,
    description?: string | undefined | null,
    indexTypeValue?: string | undefined | null,
    currencyCodeValue?: string | undefined | null,
    unitOfMeasureCodeValue?: string | undefined | null,
    frequencyCodeValue?: string | undefined | null,
    benchSettlementRuleCodeValue?: string | undefined | null,
  }
}

export interface PriceIndexSnapshotCollection extends AbstractSnapshotCollection<PriceIndexSnapshot> {}

export interface PriceCurveSnapshot extends AbstractSnapshot {
  indexId: EntityId,

  detail?: {
    curveDate?: string | undefined | null,
    hourEnding?: number | undefined | null,
    observedDateTime?: string | undefined | null,
    curveValue?: number | undefined | null,
    frequencyCodeValue?: string | undefined | null,
  }
}

  export interface PriceCurveSnapshotCollection extends AbstractSnapshotCollection<PriceCurveSnapshot> {}


