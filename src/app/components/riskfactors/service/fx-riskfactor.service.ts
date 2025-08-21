import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../../shared/service/error.service';
import {PriceRiskFactorSnapshotCollection} from '../model/price-riskfactor.model';
import {FxRiskFactorSnapshotCollection} from '../model/fx-riskfactor.model';

@Injectable({
  providedIn: 'root'
})
export class FxRiskFactorService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/fxIndices/riskFactors';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  findFxRiskFactors(searchCriteria: string, start: number, limit: number): Observable<FxRiskFactorSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<FxRiskFactorSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Positions Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
