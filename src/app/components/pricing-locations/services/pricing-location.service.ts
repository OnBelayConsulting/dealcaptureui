import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../../shared/service/error.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {PricingLocationSnapshot, PricingLocationSnapshotCollection} from '../model/pricing-location.model';
import {EntityListItemCollection} from '../../../models/abstract-snapshot';

@Injectable({
  providedIn: 'root'
})
export class PricingLocationService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/pricingLocations';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  savePricingLocation(pricingLocation: PricingLocationSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, pricingLocation)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving PricingLocation Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

  findPricingLocationEntityIds(searchCriteria: string, start: number, limit: number): Observable<EntityListItemCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<EntityListItemCollection>(this.apiUrl + '/ids', options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Power Profiles Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findPricingLocations(searchCriteria: string, start: number, limit: number): Observable<PricingLocationSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PricingLocationSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding PricingLocations Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findPricingLocationById(entityId: number): Observable<PricingLocationSnapshot> {
    return this.http.get<PricingLocationSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a PricingLocation Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
