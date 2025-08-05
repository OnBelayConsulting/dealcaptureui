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

@Injectable({
  providedIn: 'root'
})
export class PriceIndexService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/priceIndices';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  savePriceIndex(priceIndex: PriceIndexSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, priceIndex)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving PriceIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  savePriceCurve(priceCurve: PriceCurveSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/curves', priceCurve)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving priceCurve Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  listPriceIndices(): Observable<PriceIndexSnapshotCollection> {
    return this.http.get<PriceIndexSnapshotCollection>(this.apiUrl)
        .pipe(
          catchError( (error:HttpErrorResponse) => {
            console.log(error);
            this.errorService.showError("Fetching Price Indices Failed on", error.error.errorCode, error.message);
            return throwError( () => new Error("Network/Server Error occurred: " + error.status))
          })
        );
  }


  findPriceIndices(searchCriteria: string, start: number, limit: number): Observable<PriceIndexSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PriceIndexSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Price Indices Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findPriceCurves(searchCriteria: string, start: number, limit: number): Observable<PriceCurveSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PriceCurveSnapshotCollection>(this.apiUrl + '/curves', options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding price curves Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findPriceIndexById(entityId: number): Observable<PriceIndexSnapshot> {
    return this.http.get<PriceIndexSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a PriceIndex Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findPriceCurveById(entityId: number): Observable<PriceCurveSnapshot> {
    return this.http.get<PriceCurveSnapshot>(this.apiUrl + "/curves/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a price curve Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  uploadCurveFile(formData: FormData): Observable<TransactionResult> {
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<TransactionResult>(this.apiUrl + '/prices', formData)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Uploading curves Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



}
