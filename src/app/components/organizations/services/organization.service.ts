import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

import {ErrorService} from '../../shared/service/error.service';
import {
  OrganizationRoleSnapshot, OrganizationRoleSummaryCollection,
  OrganizationSnapshot, OrganizationSnapshotCollection
} from '../model/organization.model';
import {TransactionResult} from '../../../models/transactionresult.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiOrgRoleUrl = 'http://localhost:9101/DealCapture/api/organizations/organizationRoleSummaries';
  private apiOrgRoleSearchUrl = 'http://localhost:9101/DealCapture/api/organizations/searchedRoleSummaries';
  private apiOrgUrl = 'http://localhost:9101/DealCapture/api/organizations';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);



  listOrganizations(): Observable<OrganizationSnapshotCollection> {
    return this.http.get<OrganizationSnapshotCollection>(this.apiOrgUrl)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Fetching organizations failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

  saveOrganization(organization: OrganizationSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiOrgUrl, organization)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Save organization failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  saveOrganizationRole(
    organizationId: number,
    organizationRoles: OrganizationRoleSnapshot[]): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiOrgUrl + '/' + organizationId + '/roles', organizationRoles)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Save organization role failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findOrganizations(searchCriteria: string, start: number, limit:number): Observable<OrganizationSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<OrganizationSnapshotCollection>(this.apiOrgUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Finding organizations failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findOrganizationById(entityId: number): Observable<OrganizationSnapshot> {
    return this.http.get<OrganizationSnapshot>(this.apiOrgUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Finding  an organization failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

  findOrganizationRoleSummaries(searchName: string, organizationRoleType: string): Observable<OrganizationRoleSummaryCollection> {
    const options = { params: new HttpParams().set('searchName', searchName).set('roleType' , organizationRoleType) };
    return this.http.get<OrganizationRoleSummaryCollection>(this.apiOrgRoleSearchUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Finding organization role summaries failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );


  }


}
