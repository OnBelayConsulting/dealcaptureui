import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {TransactionResult} from '../models/transactionresult.model';
import {
  InterestCurveSnapshot, InterestCurveSnapshotCollection,
  InterestIndexSnapshot,
  InterestIndexSnapshotCollection
} from '../components/pricing/model/interest-rate.model';
@Injectable({
  providedIn: 'root'
})
export class InterestIndexService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/interestIndices';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  saveInterestIndex(interestIndex: InterestIndexSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, interestIndex)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving InterestIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  saveInterestCurve(interestCurve: InterestCurveSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/curves', interestCurve)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving interestCurve Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  listInterestIndices(): Observable<InterestIndexSnapshotCollection> {
    return this.http.get<InterestIndexSnapshotCollection>(this.apiUrl)
        .pipe(
          catchError( (error:HttpErrorResponse) => {
            console.log(error);
            this.errorService.showError("Fetching Interest Indices Failed on", error.error.errorCode, error.message);
            return throwError( () => new Error("Network/Server Error occurred: " + error.status))
          })
        );
  }


  findInterestIndices(searchCriteria: string, start: number, limit: number): Observable<InterestIndexSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<InterestIndexSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Interest Indices Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findInterestCurves(searchCriteria: string, start: number, limit: number): Observable<InterestCurveSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<InterestCurveSnapshotCollection>(this.apiUrl + '/curves', options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding interest curves Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findInterestIndexById(entityId: number): Observable<InterestIndexSnapshot> {
    return this.http.get<InterestIndexSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a InterestIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findInterestCurveById(entityId: number): Observable<InterestCurveSnapshot> {
    return this.http.get<InterestCurveSnapshot>(this.apiUrl + "/curves/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a interest curve Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  uploadCurveFile(formData: FormData): Observable<TransactionResult> {
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<TransactionResult>(this.apiUrl + '/rates', formData)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Uploading curves Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



}
