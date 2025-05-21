import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {DealSnapshotCollection} from '../model/dealSnapshotCollection';
import {DealSnapshot} from '../model/deal.model';
import {ErrorService} from '../../shared/service/error.service';
import {TransactionResult} from '../../../models/transactionresult.model';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/deals';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  saveDeal(deal: DealSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, deal)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving Deal Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  listDeals(): Observable<DealSnapshotCollection> {
    return this.http.get<DealSnapshotCollection>(this.apiUrl)
        .pipe(
          catchError( (error:HttpErrorResponse) => {
            console.log(error);
            this.errorService.showError("Fetching Deals Failed on", error.error.errorCode, error.message);
            return throwError( () => new Error("Network/Server Error occurred: " + error.status))
          })
        );
  }


  findDeals(searchCriteria: string, start: number, limit: number): Observable<DealSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<DealSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Deals Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findDealById(entityId: number): Observable<DealSnapshot> {
    return this.http.get<DealSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a Deal Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
