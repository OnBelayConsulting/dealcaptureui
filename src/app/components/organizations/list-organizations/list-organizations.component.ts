import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {SearchComponent} from "../../shared/search/search.component";
import {OrganizationService} from '../services/organization.service';
import {SearchColumnModel, SearchConfig} from '../../../models/search-column.model';
import {RouterLink} from '@angular/router';
import {OrganizationSnapshotCollection} from '../model/organization.model';

@Component({
  selector: 'app-organizations',
  imports: [
    SearchComponent,
    RouterLink
  ],
  templateUrl: './list-organizations.component.html',
  styleUrl: './list-organizations.component.scss'
})
export class ListOrganizationsComponent implements OnInit {
  private organizationService = inject(OrganizationService);

  selectedOrganizationId: number | undefined = undefined;

  organizationCollection: OrganizationSnapshotCollection | undefined = undefined;

  selectionCriteria:string = 'default';
  showNext: boolean = false;
  showPrev: boolean = false;

  public organizationSearchColumns: SearchColumnModel[] = [
    { label: 'None', columnName: "none", columnType: "TEXT"},
    { label: 'Short Name', columnName: "shortName", columnType: "TEXT" },
    { label: 'Legal Name', columnName: "legalName", columnType: "TEXT" },
  ];

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

  onSearch(searchConfig: SearchConfig) {
    this.selectionCriteria = searchConfig.searchCriteria;
    let subscription  =this.organizationService.findOrganizations(
      this.selectionCriteria,
      0,
      searchConfig.limit).subscribe({
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
      this.selectionCriteria,
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
    let newStart = this.organizationCollection!.start - this.organizationCollection!.count;

    let subscription  =this.organizationService.findOrganizations(
      this.selectionCriteria,
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




}
