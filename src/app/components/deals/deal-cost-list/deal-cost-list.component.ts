import {Component, DestroyRef, inject, input, signal} from '@angular/core';
import {DealSearchComponent} from "../deal-search/deal-search.component";
import {HasRolesDirective} from "keycloak-angular";
import {Router, RouterLink} from "@angular/router";
import {DealService} from '../../../services/deal.service';
import {DealSearchService} from '../services/deal-search.service';
import {DealSnapshotCollection} from '../model/dealSnapshotCollection';
import {DealCostSnapshotCollection} from '../model/deal-cost.model';

@Component({
  selector: 'app-deal-cost-list',
    imports: [
        HasRolesDirective,
        RouterLink
    ],
  templateUrl: './deal-cost-list.component.html',
  styleUrl: './deal-cost-list.component.scss'
})
export class DealCostListComponent {
  private readonly dealService = inject(DealService);
  private router = inject(Router);

  dealId = input.required<number>();

  dealCostSnapshotCollection: DealCostSnapshotCollection | null = null;

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {

    let subscription  =this.dealService.findDealCosts(this.dealId())
      .subscribe({
      next: (data) => {
        this.dealCostSnapshotCollection = data;
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }



  onEdit(entityId: number) {
    this.router.navigate(['deals',this.dealId(), 'dealCosts', 'edit'], {queryParams: {entityId: entityId}});
  }

  startSearch() {
    let subscription  =this.dealService.findDealCosts(this.dealId())
      .subscribe({
        next: (data) => {
          this.dealCostSnapshotCollection = data;
        },
        error: err => console.log(err)
      });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


}
