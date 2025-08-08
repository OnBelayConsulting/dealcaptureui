import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {OrganizationService} from '../../../services/organization.service';
import {RouterLink} from '@angular/router';
import {OrganizationSnapshotCollection} from '../model/organization.model';
import {OrganizationSearchService} from '../services/list-organizations.service';
import {OrganizationSearchComponent} from '../organization-search/organization-search.component';

@Component({
  selector: 'app-organizations',
  imports: [
    RouterLink,
    OrganizationSearchComponent
  ],
  templateUrl: './organizations-list.component.html',
  styleUrl: './organizations-list.component.scss'
})
export class OrganizationsListComponent implements OnInit {
  private organizationService = inject(OrganizationService);
  organizationSearchService = inject(OrganizationSearchService);

  selectedOrganizationId: number | undefined = undefined;

  organizationCollection: OrganizationSnapshotCollection | undefined = undefined;

  showSearchByRoleType = computed( () => {
    if (this.organizationSearchService.organizationRoleType() === 'All') {
      return 'All';
    } else if (this.organizationSearchService.organizationRoleType() === 'CO') {
      return 'Company';
    } else {
      return 'Counterparty';
    }
  });

  showSearchFields = signal<boolean>(false);

  showNext: boolean = false;
  showPrev: boolean = false;

  destroyRef = inject(DestroyRef);



  ngOnInit() {
    let subscription = this.organizationService.listOrganizations().subscribe({
      next: (data) => {
        this.organizationCollection = data;
        this.setNextAndPrev()
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onSelected(entityId: number) {
    this.selectedOrganizationId = entityId;
  }

  private setNextAndPrev() {
    if (this.organizationCollection) {
      if (this.organizationCollection.start === 0) {
        this.showPrev = false;
      } else {
        this.showPrev = true;
      }
      let currentPosition = this.organizationCollection.start + this.organizationCollection.count;
      if (currentPosition < this.organizationCollection.totalItems) {
        this.showNext = true;
      } else {
        this.showNext = false;
      }

    }
  }
  startSearch() {
    let subscription  =this.organizationService.findOrganizations(
      this.organizationSearchService.searchCriteria(),
      this.organizationSearchService.organizationRoleType(),
      0,
      this.organizationSearchService.limitSetting()).subscribe({
      next: (data) => {
        this.organizationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onNext() {
    let currentPosition = this.organizationCollection!.start + this.organizationCollection!.count;

    let subscription  =this.organizationService.findOrganizations(
      this.organizationSearchService.searchCriteria(),
      this.organizationSearchService.organizationRoleType(),
      currentPosition,
      this.organizationCollection!.limit
    ).subscribe({
      next: (data) => {
        this.organizationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onPrev() {
    let newStart = this.organizationCollection!.start - this.organizationCollection!.limit;
    if (newStart < 0)
      newStart = 0;

    let subscription  =this.organizationService.findOrganizations(
      this.organizationSearchService.searchCriteria(),
      this.organizationSearchService.organizationRoleType(),
      newStart,
      this.organizationCollection!.limit
    ).subscribe({
      next: (data) => {
        this.organizationCollection = data;
        this.setNextAndPrev()
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }


  onClose() {
    this.showSearchFields.set(false);
    this.startSearch();
  }

  onShowSearch() {
    this.showSearchFields.set(true);
  }


  onCancelSearch() {
    this.showSearchFields.set(false);
  }
}
