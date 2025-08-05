import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {TransactionResult} from '../models/transactionresult.model';
import {
  FxCurveSnapshot,
  FxCurveSnapshotCollection, FxIndexSnapshot,
  FxIndexSnapshotCollection
} from '../components/pricing/model/fx.model';

@Injectable({
  providedIn: 'root'
})
export class FxIndexService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/fxIndices';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  saveFxIndex(fxIndex: FxIndexSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, fxIndex)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving FxIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  saveFxCurve(fxCurve: FxCurveSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/curves', fxCurve)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving fxCurve Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  listFxIndices(): Observable<FxIndexSnapshotCollection> {
    return this.http.get<FxIndexSnapshotCollection>(this.apiUrl)
        .pipe(
          catchError( (error:HttpErrorResponse) => {
            console.log(error);
            this.errorService.showError("Fetching Fx Indices Failed on", error.error.errorCode, error.message);
            return throwError( () => new Error("Network/Server Error occurred: " + error.status))
          })
        );
  }


  findFxIndices(searchCriteria: string, start: number, limit: number): Observable<FxIndexSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<FxIndexSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Fx Indices Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findFxCurves(searchCriteria: string, start: number, limit: number): Observable<FxCurveSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<FxCurveSnapshotCollection>(this.apiUrl + '/curves', options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding fx curves Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findFxIndexById(entityId: number): Observable<FxIndexSnapshot> {
    return this.http.get<FxIndexSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a FxIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findFxCurveById(entityId: number): Observable<FxCurveSnapshot> {
    return this.http.get<FxCurveSnapshot>(this.apiUrl + "/curves/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a fx curve Failed on", error.error.errorCode, error.message);
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
