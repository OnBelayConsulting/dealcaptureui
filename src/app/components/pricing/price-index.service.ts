import {inject, Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {PriceIndexSnapshotCollection} from './model/price.model';
import {ErrorService} from '../shared/service/error.service';

@Injectable({
  providedIn: 'root'
})
export class PriceIndexService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/priceIndices';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  findPriceIndices(searchCriteria: string, start: number, limit:number): Observable<PriceIndexSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<PriceIndexSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Finding pricing indices failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



}
