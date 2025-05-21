import {FormControl, FormGroup} from '@angular/forms';


export interface PhysicalDealFormGroup {
  dealPrice: FormControl,
  dealPriceCurrency: FormControl,
  dealPriceUoM: FormControl,
  dealIndex: FormControl,
  marketIndex: FormControl
}


export interface DealForm {
  ticketNo: FormControl;
  commodity: FormControl;
  dealStatus: FormControl;
  company: FormControl;
  counterparty: FormControl;
  buySellCode: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  physicalDealPricing: FormGroup<PhysicalDealFormGroup>;
}
