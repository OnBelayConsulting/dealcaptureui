import {AbstractSnapshot, AbstractSnapshotCollection} from '../../../models/abstract-snapshot';
import {DealSnapshot} from './deal.model';

type overrideValue = number | null;


export interface DealOverrideDaySnapshot {
  overrideDate : string,
  dayOfMonth : number,
  values :overrideValue[]
}

export interface DealOverrideMonthSnapshot extends AbstractSnapshot {
  headings?: string[];
  monthDate : string,
  monthStartDate : string,
  monthEndDate : string,
  overrideDays : DealOverrideDaySnapshot[]
}

export interface DealOverrideHourSnapshot {
  dayDate : string | null,
  hourEnding : number | null,
  values :overrideValue[]
}


export interface DealOverrideHoursForDaySnapshot extends AbstractSnapshot {
  headings?: string[];
  costHeadings?: string[];
  dayDate : string,
  overrideHours : DealOverrideHourSnapshot[]
}


export interface DealOverrideSnapshotCollection extends AbstractSnapshotCollection<DealOverrideDaySnapshot>{
    startDate?: string;
    endDate?: string;
    headings?: string[];

}


