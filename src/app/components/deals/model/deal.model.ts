import {AbstractSnapshot, EntityId} from '../../../models/abstract-snapshot';

export interface DealSnapshot extends AbstractSnapshot{
  dealTypeValue?: string;
  companyRoleId? : EntityId,
  companyTraderId? : EntityId,

  powerProfileId? : EntityId,

  counterpartyRoleId? : EntityId,
  counterpartyTraderId? : EntityId,

  administratorId? : EntityId,

  dealDetail?: {
    commodityCodeValue?: string;
    dealStatusCodeValue?: string;
    buySellCodeValue?: string;
    ticketNo?: string;
    startDate?: string;
    endDate?: string;
    volumeQuantity?: number;
    volumeUnitOfMeasureCodeValue?: string;
    volumeFrequencyCodeValue?: string;

    reportingCurrencyCodeValue?: string;
    settlementCurrencyCodeValue?: string;

    fixedPriceValue?: number;
    fixedPriceCurrencyCodeValue?: string;
    fixedPriceUnitOfMeasureCodeValue?: string;

  }

}

export interface PhysicalDealSnapshot extends DealSnapshot {
  marketPriceIndexId? : EntityId,

  dealPriceIndexId? : EntityId,

  physicalDealDetail? : {
    dealPriceValuationCodeValue: string;
    marketValuationCodeValue: string;
  }
}

export interface FinancialSwapDealSnapshot extends  DealSnapshot {

  paysPriceIndexId : EntityId,
  receivesPriceIndexId : EntityId,

  detail : {
    paysValuationCodeValue : 'Fixed' | 'Index' | 'IndexPlus' | 'PowerProfile' | null | undefined;
    receivesValuationCodeValue : 'Index'| 'PowerProfile'| null | undefined;
  }

}

export interface OptionDealDetail {
  optionExpiryDateRuleValue : 'pstart' | 'pend',
  tradeTypeCodeValue : 'OTC' | 'Exchange',
  optionTypeCodeValue : 'Call' | 'Put',
  optionStyleCodeValue : 'European' | 'American',

  strikePriceValue : number | null,
  strikePriceCurrencyCodeValue : string | null,
  strikePriceUnitOfMeasureCodeValue : string | null,


  premiumPriceValue : number | null,
  premiumPriceCurrencyCodeValue : string | null,
  premiumPriceUnitOfMeasureCodeValue : string | null,


}

export interface VanillaOptionDealSnapshot extends DealSnapshot {
  underlyingPriceIndexId : EntityId,
  detail : OptionDealDetail

}

export interface MarkToMarketJobRequest {
  dealQueryText:  string | undefined,
  powerProfileQueryText:  string | undefined,
  priceIndexQueryText:  string | undefined,
  currencyCodeValue :  string | undefined,
  createdDateTime:  string | undefined,
  fromDate :  string | undefined,
  toDate :  string | undefined,
}

