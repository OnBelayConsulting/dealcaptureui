import {AbstractSnapshot, AbstractSnapshotCollection, EntityId} from '../../../models/abstract-snapshot';

export interface InterestIndexSnapshot extends AbstractSnapshot {

  detail?: {
    name?: string | undefined | null,
    description?: string | undefined | null,
    frequencyCodeValue?: string | undefined | null,
    isRiskFreeRate?: boolean | undefined | null,
  }
}

export interface InterestIndexSnapshotCollection extends AbstractSnapshotCollection<InterestIndexSnapshot> {}

export interface InterestCurveSnapshot extends AbstractSnapshot {
  indexId: EntityId,

  detail?: {
    curveDate?: string | undefined | null,
    hourEnding?: number | undefined | null,
    observedDateTime?: string | undefined | null,
    curveValue?: number | undefined | null,
    frequencyCodeValue?: string | undefined | null,
  }
}

  export interface InterestCurveSnapshotCollection extends AbstractSnapshotCollection<InterestCurveSnapshot> {}


