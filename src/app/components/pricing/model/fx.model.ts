import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface FxIndexSnapshot extends AbstractSnapshot {

  detail?: {
    name?: string | undefined | null,
    description?: string | undefined | null,
    fromCurrencyCodeValue?: string | undefined | null,
    toCurrencyCodeValue?: string | undefined | null,
    frequencyCodeValue?: string | undefined | null,
    daysOffsetForExpiry?: number | undefined | null,
  }
}

export interface FxIndexSnapshotCollection extends AbstractSnapshotCollection<FxIndexSnapshot> {}

export interface FxCurveSnapshot extends AbstractSnapshot {
  indexId: EntityId,

  detail?: {
    curveDate?: string | undefined | null,
    hourEnding?: number | undefined | null,
    observedDateTime?: string | undefined | null,
    curveValue?: number | undefined | null,
    frequencyCodeValue?: string | undefined | null,
  }
}

  export interface FxCurveSnapshotCollection extends AbstractSnapshotCollection<FxCurveSnapshot> {}


