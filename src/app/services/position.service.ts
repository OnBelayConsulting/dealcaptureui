import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {CreatedDateTimeCollection, DealPositionSnapshotCollection} from '../components/positions/model/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/positions';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);


  findPositions(searchCriteria: string, start: number, limit: number): Observable<DealPositionSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<DealPositionSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Positions Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  fetchPositionsAsCSVFile(searchCriteria: string, start: number, limit: number) {
    const headers = new HttpHeaders().set('Accept', 'application/text');
    const type = 'blob' as 'blob';
    const options = { headers: headers, responseType: type,  params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) };
    this.http.get(this.apiUrl, options).subscribe({
        next: (response: any) => {
          let downloadLink = document.createElement('a');
          let blob = response as Blob;
          downloadLink.href = URL.createObjectURL(response as Blob);
          downloadLink.setAttribute('download', 'positions.csv');
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.parentNode?.removeChild(downloadLink);
        }
      }
    );
  }


  getCreatedDateTimes(): Observable<CreatedDateTimeCollection> {
    return this.http.get<CreatedDateTimeCollection>(this.apiUrl + '/createdDateTimes')
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("get CreatedDateTimes Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

}
