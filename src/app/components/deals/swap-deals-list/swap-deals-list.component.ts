import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DealSearchService} from '../services/deal-search.service';
import {FinancialSwapDealSnapshot, PhysicalDealSnapshot} from '../model/deal.model';

@Component({
  selector: 'app-swap-deals-list',
    imports: [
        RouterLink
    ],
  templateUrl: './swap-deals-list.component.html',
  styleUrl: './swap-deals-list.component.scss'
})
export class SwapDealsListComponent {
  private router = inject(Router);

  dealSearchService = inject(DealSearchService);


  swapDeals = computed<FinancialSwapDealSnapshot[] | undefined>( () => {
    if (this.dealSearchService.dealSnapshotCollection())
      return this.dealSearchService.dealSnapshotCollection()!.snapshots.map( (s) => s as FinancialSwapDealSnapshot );
    else
      return undefined;
  });



  ngOnInit(): void {
    this.dealSearchService.startSearch()
  }


  onEdit(entityId: number, dealTypeCode: string) {
    this.router.navigate(['deals', dealTypeCode, 'edit'], {queryParams: {dealId: entityId}});
  }


}
