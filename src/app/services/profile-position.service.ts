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
import {
  PowerProfilePositionSnapshot,
  PowerProfilePositionSnapshotCollection
} from '../components/powerprofile/model/profile-position.model';

@Injectable({
  providedIn: 'root'
})
export class PowerProfilePositionService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/powerProfile/positions';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);

  findPowerProfilePositions(searchCriteria: string, start: number, limit: number): Observable<PowerProfilePositionSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PowerProfilePositionSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Power Profiles Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findPowerProfilePositionById(entityId: number): Observable<PowerProfilePositionSnapshot> {
    return this.http.get<PowerProfilePositionSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a Power Profile Position Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


}
