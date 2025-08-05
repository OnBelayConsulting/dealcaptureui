import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DealSearchService} from '../services/deal-search.service';
import {PhysicalDealSnapshot} from '../model/deal.model';

@Component({
  selector: 'app-physical-deals-list',
  imports: [
    RouterLink
  ],
  templateUrl: './physical-deals-list.component.html',
  styleUrl: './physical-deals-list.component.scss'
})
export class PhysicalDealsListComponent {
  private router = inject(Router);

  dealSearchService = inject(DealSearchService);


  physicalDeals = computed<PhysicalDealSnapshot[] | undefined>( () => {
    if (this.dealSearchService.dealSnapshotCollection())
      return this.dealSearchService.dealSnapshotCollection()!.snapshots.map( (s) => s as PhysicalDealSnapshot );
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
