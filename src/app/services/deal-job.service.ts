import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {TransactionResult} from '../models/transactionresult.model';
import {DealJobSnapshot, DealJobSnapshotCollection} from '../components/jobs/model/deal-job.model';

@Injectable({
  providedIn: 'root'
})
export class DealJobService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/jobs';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  create(context: DealJobSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, context)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Create job failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  delete(dealId : number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/' + dealId + '/deleted', null)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Delete job failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  cancel(dealId : number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/' + dealId + '/cancelled', null)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Cancel job failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findJobs(searchCriteria: string, start: number, limit: number): Observable<DealJobSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<DealJobSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding jobs Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
