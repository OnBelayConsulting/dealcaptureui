import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {DealPositionSnapshotCollection} from '../components/positions/model/position.model';
import {PriceRiskFactorSnapshotCollection} from '../components/riskfactors/model/price-riskfactor.model';

@Injectable({
  providedIn: 'root'
})
export class PriceRiskFactorService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/priceIndices/riskFactors';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  findPriceRiskFactors(searchCriteria: string, start: number, limit: number): Observable<PriceRiskFactorSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PriceRiskFactorSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Positions Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
