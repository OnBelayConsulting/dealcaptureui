import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {DealSearchComponent} from '../deal-search/deal-search.component';
import {DealSearchService} from '../services/deal-search.service';
import {HasRolesDirective} from 'keycloak-angular';
import {DealFileUploadComponent} from '../deal-file-upload/deal-file-upload.component';
import {DealOverridesFileUploadComponent} from '../deal-overrides-file-upload/deal-overrides-file-upload.component';
import {DefaultDealsListComponent} from '../default-deals-list/default-deals-list.component';
import {PhysicalDealsListComponent} from '../physical-deals-list/physical-deals-list.component';
import {SwapDealsListComponent} from '../swap-deals-list/swap-deals-list.component';
import {VanillaOptionDealsListComponent} from '../vanilla-option-deals-list/vanilla-option-deals-list.component';

@Component({
  selector: 'app-deals',
  templateUrl: './deals-list.component.html',
  imports: [
    DealSearchComponent,
    RouterLink,
    HasRolesDirective,
    DealFileUploadComponent,
    DealOverridesFileUploadComponent,
    DefaultDealsListComponent,
    PhysicalDealsListComponent,
    SwapDealsListComponent,
    VanillaOptionDealsListComponent
  ],
  styleUrls: ['./deals-list.component.css']
})
export class DealsListComponent {
  private router = inject(Router);

  dealSearchService = inject(DealSearchService);

  showSearchFields = signal<boolean>(false);
  showSearchLabel = signal("Change search");

  showFileUpload = signal<boolean>(false);

  showOverridesFileUpload = signal<boolean>(false);

  destroyRef = inject(DestroyRef);



  setToAll() {
    this.dealSearchService.updateDealTypeFilter('default');
  }

  setToPhysicalDeals() {
    this.dealSearchService.updateDealTypeFilter('PhysicalDeal');
  }

  setToFinancialSwaps() {
    this.dealSearchService.updateDealTypeFilter('FinancialSwap');
  }

  setToVanillaOptions() {
    this.dealSearchService.updateDealTypeFilter('VanillaOption');
  }

  onClose() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change search');
  }

  onToggleShowSearch() {
    this.showSearchFields.update( (val) => !val);
    if (!this.showSearchFields())
      this.showSearchLabel.set("Change search");
    else
      this.showSearchLabel.set("Hide search");
  }


  onFileUploadShow() {
    this.showFileUpload.set(true);
  }

  onFileUploadClose() {
    this.showFileUpload.set(false);
  }


  onOverrideFileUploadShow() {
    this.showOverridesFileUpload.set(true);
  }

  onOverrideFileUploadClose() {
    this.showOverridesFileUpload.set(false);
  }


}
