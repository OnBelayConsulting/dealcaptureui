import {AbstractSnapshot} from '../../../models/abstract-snapshot';

export interface DealSnapshot extends AbstractSnapshot{
  dealTypeValue?: string;
  companyRoleId? : {
    id?: number;
    code?: string;
  }
  counterpartyRoleId? : {
    id?: number;
    code?: string;
  }
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
  marketPriceIndexId? : {
    id?: number;
    code?: string;
  }
  dealPriceIndexId? : {
    id?: number;
    code?: string;
  }

  physicalDealDetail? : {
    dealPriceValuationCodeValue: string;
    marketValuationCodeValue: string;
  }


}

