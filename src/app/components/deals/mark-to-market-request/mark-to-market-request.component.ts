import {Component, computed, DestroyRef, inject, input, signal} from '@angular/core';
import {DealSearchComponent} from "../deal-search/deal-search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from '@angular/router';
import {DealJobService} from '../../../services/deal-job.service';
import {DealSearchService} from '../services/deal-search.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {MarkToMarketJobRequest} from '../model/deal.model';
import {DealService} from '../../../services/deal.service';
import {PowerProfileSearchComponent} from '../../powerprofile/power-profile-search/power-profile-search.component';
import {PowerProfileSearchService} from '../../powerprofile/service/power-profile-search.service';
import {PriceIndexSearchService} from '../../pricing/services/price-index-search.service';

@Component({
  selector: 'app-mark-to-market-request',
  imports: [
    DealSearchComponent,
    FormsModule,
    ReactiveFormsModule,
    PowerProfileSearchComponent
  ],
  templateUrl: './mark-to-market-request.component.html',
  styleUrl: './mark-to-market-request.component.scss'
})
export class MarkToMarketRequestComponent {
  router = inject(Router);
  dealService = inject(DealService);
  destroyRef = inject(DestroyRef);
  dealSearchService = inject(DealSearchService);
  powerProfileSearchService = inject(PowerProfileSearchService);
  priceIndexSearchService = inject(PriceIndexSearchService);

  showDealSearchFields = signal<boolean>(false);
  showPowerProfileSearchFields = signal<boolean>(false);
  showPriceIndexSearchFields = signal<boolean>(false);

  hasErrors = false;

  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  modifiedSnapshot :MarkToMarketJobRequest  =  {
    dealQueryText: 'default',
    powerProfileQueryText: 'default',
    priceIndexQueryText: 'default',
    createdDateTime: undefined,
    currencyCodeValue: 'CAD',
    fromDate: undefined,
    toDate: undefined,
  };

  ngOnInit(): void {
  }

  onReset() {
    this.router.navigate(['deals', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    if (this.modifiedSnapshot.dealQueryText == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Deal Query text must not be null.")
    }
    if (this.modifiedSnapshot.powerProfileQueryText == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Power Profile Query text must not be null.")
    }
    if (this.modifiedSnapshot.priceIndexQueryText == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Price Index Query text must not be null.")
    }
    if (this.modifiedSnapshot.fromDate == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing from date.")
    }
    if (this.modifiedSnapshot.createdDateTime == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing created date.")
    }
    if (this.modifiedSnapshot.toDate == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing to date.")
    }
    if (this.modifiedSnapshot.currencyCodeValue == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing currency.")
    }
    if (this.hasErrors)
      return;

    let subscription = this.dealService.saveMarkToMarketRequest(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onCloseDealSearch() {
    this.modifiedSnapshot!.dealQueryText = this.dealSearchService.searchCriteria();
    this.showDealSearchFields.set(false);
  }

  onShowDealSearch() {
    this.showDealSearchFields.set(true);
  }

  onClosePowerProfileSearch() {
    this.modifiedSnapshot!.powerProfileQueryText = this.powerProfileSearchService.searchCriteria();
    this.showPowerProfileSearchFields.set(false);
  }

  onShowPowerProfileSearch() {
    this.showPowerProfileSearchFields.set(true);
  }

  onClosePriceIndexSearch() {
    this.modifiedSnapshot!.priceIndexQueryText = this.priceIndexSearchService.searchCriteria();
    this.showPriceIndexSearchFields.set(false);
  }

  onShowPriceIndexSearch() {
    this.showPriceIndexSearchFields.set(true);
  }



}
