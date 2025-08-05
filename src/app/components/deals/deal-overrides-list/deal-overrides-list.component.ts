import {Component, DestroyRef, inject, input, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DealService} from '../../../services/deal.service';
import {DealOverrideSnapshotCollection} from '../model/deal-overrides.model';
import {DatePipe, DecimalPipe} from '@angular/common';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-deal-overrides-list',
  imports: [
    DatePipe,
    DecimalPipe,
    HasRolesDirective,
    RouterLink,
  ],
  templateUrl: './deal-overrides-list.component.html',
  styleUrl: './deal-overrides-list.component.scss'
})
export class DealOverridesListComponent {
  private readonly dealService = inject(DealService);
  private router = inject(Router);
  dealId = input.required<number>();

  dealOverrideSnapshotCollection: DealOverrideSnapshotCollection | null = null;

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    let subscription  =this.dealService.findDealOverrides(this.dealId(), 0, 31).subscribe({
      next: (data) => {
        this.dealOverrideSnapshotCollection = data;
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  private setNextAndPrev() {
    if (this.dealOverrideSnapshotCollection) {
      if (this.dealOverrideSnapshotCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.dealOverrideSnapshotCollection.start + this.dealOverrideSnapshotCollection.count;
      if (currentPosition < this.dealOverrideSnapshotCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }


  onNext() {
    let currentPosition = this.dealOverrideSnapshotCollection!.start + this.dealOverrideSnapshotCollection!.count;

    let subscription  =this.dealService.findDealOverrides(this.dealId(), currentPosition, 31).subscribe({
      next: (data) => {
        this.dealOverrideSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.dealOverrideSnapshotCollection!.start - this.dealOverrideSnapshotCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.dealService.findDealOverrides(this.dealId(), newStart, 31).subscribe({
      next: (data) => {
        this.dealOverrideSnapshotCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

}
