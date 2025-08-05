import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DealSearchService} from '../services/deal-search.service';
import {FinancialSwapDealSnapshot, VanillaOptionDealSnapshot} from '../model/deal.model';

@Component({
  selector: 'app-vanilla-option-deals-list',
    imports: [
        RouterLink
    ],
  templateUrl: './vanilla-option-deals-list.component.html',
  styleUrl: './vanilla-option-deals-list.component.scss'
})
export class VanillaOptionDealsListComponent {
  private router = inject(Router);

  dealSearchService = inject(DealSearchService);


  options = computed<VanillaOptionDealSnapshot[] | undefined>( () => {
    if (this.dealSearchService.dealSnapshotCollection())
      return this.dealSearchService.dealSnapshotCollection()!.snapshots.map( (s) => s as VanillaOptionDealSnapshot );
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
