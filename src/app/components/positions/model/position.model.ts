import {
  AbstractSnapshot,
  AbstractSnapshotCollection,
  EntityId,
  ErrorHoldingSnapshot
} from '../../../models/abstract-snapshot';


export interface PositionDetail {
  errorCode : string,
  errorMessage : string,
  startDate: string,
  endDate : string,
  createdDateTime : string,
  valuedDateTime? : string,
  volumeQuantityValue? : number,
  volumeUnitOfMeasure : string,
  frequencyCodeValue : string,
  powerCodeValue : string,
  currencyCodeValue : string,
  fixedPriceValue : number,

}

export interface PositionSettlementDetail {
  settlementReference : string,
  isSettlementPosition : boolean,
  markToMarketValuation : number,
  costSettlementAmount : number,
  totalSettlementAmount : number,
  settlementCurrencyCodeValue : string
}


export interface DealPositionSnapshot extends AbstractSnapshot {
  dealTypeValue : string,
  dealId: EntityId,
  positionDetail : PositionDetail,
  settlementDetail : PositionSettlementDetail

}

export interface FinancialSwapPositionPriceDetail {
  paysPriceValue? : number | null | undefined,
  paysIndexValue? : number | null | undefined,
  receivesPriceValue? : number | null | undefined,
  totalPaysValue? : number | null | undefined,

}

export interface FinancialSwapPositionSnapshot extends DealPositionSnapshot {
  receivesPriceIndexName? : string | null | undefined,
  paysPriceIndexName? : string | null | undefined,
  priceDetail : FinancialSwapPositionPriceDetail,

}


export interface PhysicalPositionPriceDetail {
  dealPriceValue? : number | null | undefined,
  dealIndexValue? : number | null | undefined,
  marketPriceValue? : number | null | undefined,
  totalPaysValue? : number | null | undefined,

}


export interface PhysicalPositionSnapshot extends DealPositionSnapshot {
  dealPriceIndexName? : string | null | undefined,
  marketPriceIndexName? : string | null | undefined,
  priceDetail : PhysicalPositionPriceDetail,

}

export interface CreatedDateTimeCollection extends ErrorHoldingSnapshot {
  createdDateTimeList : string[] | null | undefined;
}

export interface DealPositionSnapshotCollection extends AbstractSnapshotCollection<DealPositionSnapshot> {

}
