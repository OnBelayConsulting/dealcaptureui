import {Component, computed, DestroyRef, EventEmitter, inject, input, OnInit, Output, signal} from '@angular/core';
import {DealSnapshot} from '../model/deal.model';
import {FormsModule} from '@angular/forms';
import {BaseDealViewComponent} from '../base-deal-view/base-deal-view.component';
import {PhysicalDealViewComponent} from '../../organizations/physical-deal-view/physical-deal-view.component';
import {DealService} from '../services/deal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deal-view',
  imports: [
    FormsModule,
    BaseDealViewComponent,
    PhysicalDealViewComponent
  ],
  templateUrl: './deal-view.component.html',
  styleUrl: './deal-view.component.scss'
})
export class DealViewComponent implements OnInit {

  dealService = inject(DealService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  dealId = input.required<number>();
  deal: DealSnapshot | undefined =undefined;

  ngOnInit(): void {
   let subscription = this.dealService.findDealById(this.dealId()).subscribe((data) => {
      this.deal = data;
    });


    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

  onClose() {
    this.router.navigate(['deals', 'list']);
  }
}
