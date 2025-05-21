import {AbstractSnapshot, AbstractSnapshotCollection} from '../../../models/abstract-snapshot';

export interface OrganizationRoleSnapshot extends AbstractSnapshot {
  organizationRoleTypeValue: string,
  roleDetail? : {
    organizationRoleStatusValue?: string;
  }
}


export interface CompanyRoleSnapshot extends OrganizationRoleSnapshot{
  detail?: {
    isHoldingParent?: boolean;
  }
}

export interface CounterpartyRoleSnapshot  extends OrganizationRoleSnapshot{
  detail?: {
    settlementCurrencyCodeValue?: string;
  }
}



export interface OrganizationSnapshot extends AbstractSnapshot{

  companyRoleSnapshot? : CompanyRoleSnapshot;
  counterpartyRoleSnapshot? : CounterpartyRoleSnapshot;
  detail? : {
    shortName?: string;
    legalName?: string;
    externalReferenceId?: number;
  }

}

export interface OrganizationRoleSummary extends AbstractSnapshot {
  organizationRoleTypeValue: string;
  organizationId: number;
  detail : {
    shortName: string;
    legalName: string;
    organizationRoleStatusValue: string;
  }
}

export interface OrganizationRoleSummaryCollection extends  AbstractSnapshotCollection<OrganizationRoleSummary> {

}

export interface OrganizationSnapshotCollection extends AbstractSnapshotCollection<OrganizationSnapshot>{

}
