import {AbstractSnapshot, AbstractSnapshotCollection} from '../../../models/abstract-snapshot';

export interface PricingLocationSnapshot extends AbstractSnapshot {
  detail?: {
    name?: string | undefined | null,
    description?: string | undefined | null,
    countryCode?: string | undefined | null,
    stateProvinceCode?: string | undefined | null
  }
}

export interface PricingLocationSnapshotCollection extends AbstractSnapshotCollection<PricingLocationSnapshot> {}
