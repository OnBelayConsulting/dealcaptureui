import {AbstractSnapshot, AbstractSnapshotCollection} from '../../../models/abstract-snapshot';

export enum ContactType { 'isCompanyTrader', 'isCounterpartyTrader' , 'isAdministrator' }

export interface BusinessContactSnapshot extends AbstractSnapshot {

  detail: {
    firstName: string,
    lastName: string,
    email: string,
    isCompanyTrader: boolean,
    isCounterpartyTrader: boolean,
    isAdministrator: boolean
  }

}

export interface BusinessContactSnapshotCollection extends  AbstractSnapshotCollection<BusinessContactSnapshot> {

}


