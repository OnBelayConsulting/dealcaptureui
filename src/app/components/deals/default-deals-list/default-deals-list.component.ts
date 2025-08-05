import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {DealSearchService} from '../services/deal-search.service';

@Component({
  selector: 'app-default-deals',
  templateUrl: './default-deals-list.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./default-deals-list.component.css']
})
export class DefaultDealsListComponent implements OnInit {
  private router = inject(Router);

  dealSearchService = inject(DealSearchService);
  ngOnInit(): void {
    this.dealSearchService.startSearch()
  }


  onEdit(entityId: number, dealTypeCode: string) {
    this.router.navigate(['deals', dealTypeCode, 'edit'], {queryParams: {dealId: entityId}});
  }

}
