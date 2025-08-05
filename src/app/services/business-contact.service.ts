import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

import {ErrorService} from '../components/shared/service/error.service';
import {
  BusinessContactSnapshot,
  BusinessContactSnapshotCollection
} from '../components/businesscontacts/model/business-contact.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessContactService {
  private apiUrl = 'http://localhost:9101/DealCapture/api/businessContacts';
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);



  listBusinessContacts(): Observable<BusinessContactSnapshotCollection> {
    return this.http.get<BusinessContactSnapshotCollection>(this.apiUrl)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Fetching organizations failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



  findBusinessContacts(searchCriteria: string, start: number, limit:number): Observable<BusinessContactSnapshotCollection> {
    const options = searchCriteria ?
      { params: new HttpParams().set('query', searchCriteria).set('start', start).set('limit', limit) } : {};
    return this.http.get<BusinessContactSnapshotCollection>(this.apiUrl, options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Finding organizations failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findBusinessContactById(entityId: number): Observable<BusinessContactSnapshot> {
    return this.http.get<BusinessContactSnapshot>(this.apiUrl + "/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("Finding  an organization failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


}
