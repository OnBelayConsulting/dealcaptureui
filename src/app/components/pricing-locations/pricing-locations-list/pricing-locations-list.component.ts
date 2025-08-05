import {Component, DestroyRef, inject, signal} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import {PricingLocationSearchComponent} from '../pricing-location-search/pricing-location-search.component';
import {PricingLocationSearchService} from '../services/pricing-location-search.service';
import {PricingLocationSnapshotCollection} from '../model/pricing-location.model';
import {PricingLocationService} from '../../../services/pricing-location.service';

@Component({
  selector: 'app-list-pricing-locations',
    imports: [
        HasRolesDirective,
        PricingLocationSearchComponent,
        RouterLink
    ],
  templateUrl: './pricing-locations-list.component.html',
  styleUrl: './pricing-locations-list.component.scss'
})
export class PricingLocationsListComponent {
  private priceLocationService = inject(PricingLocationService);
  priceLocationSearchService = inject(PricingLocationSearchService);

  selectedPricingLocationId: number | undefined = undefined;

  priceLocationCollection: PricingLocationSnapshotCollection | undefined = undefined;
  showSearchFields = signal<boolean>(false);

  showSearchLabel = signal("Change");

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    let subscription = this.priceLocationService.listPricingLocations().subscribe({
      next: (data) => {
        this.priceLocationCollection = data;
        this.setNextAndPrev()
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onSelected(entityId: number) {
    this.selectedPricingLocationId = entityId;
  }

  private setNextAndPrev() {
    if (this.priceLocationCollection) {
      if (this.priceLocationCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.priceLocationCollection.start + this.priceLocationCollection.count;
      if (currentPosition < this.priceLocationCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.priceLocationService.findPricingLocations(
      this.priceLocationSearchService.searchCriteria(),
      0,
      this.priceLocationSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.priceLocationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onNext() {
    let currentPosition = this.priceLocationCollection!.start + this.priceLocationCollection!.count;

    let subscription  =this.priceLocationService.findPricingLocations(
      this.priceLocationSearchService.searchCriteria(),
      currentPosition,
      this.priceLocationCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceLocationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.priceLocationCollection!.start - this.priceLocationCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.priceLocationService.findPricingLocations(
      this.priceLocationSearchService.searchCriteria(),
      newStart,
      this.priceLocationCollection!.limit
    ).subscribe({
      next: (data) => {
        this.priceLocationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onClose() {
    this.showSearchFields.set(false);
    this.showSearchLabel.set('Change');
  }

  onToggleShowSearch() {
    this.showSearchFields.update( (val) => !val);
    if (!this.showSearchFields())
      this.showSearchLabel.set("Change");
    else
      this.showSearchLabel.set("Hide");
  }


}
