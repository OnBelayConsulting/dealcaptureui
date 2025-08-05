import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {TransactionResult} from '../models/transactionresult.model';
import {
  PriceCurveSnapshot,
  PriceCurveSnapshotCollection,
  PriceIndexSnapshot,
  PriceIndexSnapshotCollection
} from '../components/pricing/model/price.model';
import {
  PowerProfileSnapshot,
  PowerProfileSnapshotCollection
} from '../components/powerprofile/model/power-profile.model';

@Injectable({
  providedIn: 'root'
})
export class PowerProfileService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/powerProfiles';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  savePowerProfile(profile: PowerProfileSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, profile)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving PriceIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findPowerProfiles(searchCriteria: string, start: number, limit: number): Observable<PowerProfileSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PowerProfileSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Power Profiles Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findPowerProfileById(entityId: number): Observable<PowerProfileSnapshot> {
    return this.http.get<PowerProfileSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a PriceIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


}
