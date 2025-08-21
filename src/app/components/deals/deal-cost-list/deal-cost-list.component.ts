import {Component, DestroyRef, inject, input} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {Router, RouterLink} from "@angular/router";
import {DealService} from '../services/deal.service';
import {DealCostSnapshotCollection} from '../model/deal-cost.model';

@Component({
  selector: 'app-deal-cost-list',
    imports: [
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
