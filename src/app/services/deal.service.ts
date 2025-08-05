import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {DealSnapshotCollection} from '../components/deals/model/dealSnapshotCollection';
import {DealSnapshot, MarkToMarketJobRequest} from '../components/deals/model/deal.model';
import {ErrorService} from '../components/shared/service/error.service';
import {TransactionResult} from '../models/transactionresult.model';
import {DealCostSnapshot, DealCostSnapshotCollection} from '../components/deals/model/deal-cost.model';
import {
  DealOverrideMonthSnapshot,
  DealOverrideSnapshotCollection
} from '../components/deals/model/deal-overrides.model';

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


  saveDealOverridesByMonth(dealOverride: DealOverrideMonthSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/' + dealOverride.entityId!.id + '/overrides' , dealOverride)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving Deal Overrides Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  saveMarkToMarketRequest(request:MarkToMarketJobRequest): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/mtm', request)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving request Failed on", error.error.errorCode, error.message);
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



  findDealCosts(dealId: number): Observable<DealCostSnapshotCollection> {
    return this.http.get<DealCostSnapshotCollection>(this.apiUrl + '/' + dealId + '/dealCosts')
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Deal costs Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findDealOverrides(dealId: number, start : number, limit : number): Observable<DealOverrideSnapshotCollection> {
    const options = start ?
      { params: new HttpParams().set('start', start).set('limit', limit) } : {};
    return this.http.get<DealOverrideSnapshotCollection>(this.apiUrl + '/' + dealId + '/overrides', options)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Deal overrides Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  getDealOverridesByMonth(dealId: number, monthDate : string): Observable<DealOverrideMonthSnapshot> {
    return this.http.get<DealOverrideMonthSnapshot>(this.apiUrl + '/' + dealId + '/overrides/' + monthDate)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding Deal overrides Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  findDealCostById(entityId: number): Observable<DealCostSnapshot> {
    return this.http.get<DealCostSnapshot>(this.apiUrl + "/dealCosts/" + entityId)
      .pipe(
        catchError( (error) => {
          console.log(error);
          this.errorService.showError("finding a Deal Cost Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  saveDealCost(dealCost: DealCostSnapshot): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl + '/dealCosts', dealCost)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Saving Deal Cost Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }

  uploadDealFile(formData: FormData): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, formData)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Uploading deals Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }


  uploadDealOverrideFile(formData: FormData): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(this.apiUrl, formData)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.log(error);
          this.errorService.showError("Uploading deal overrides Failed on", error.error.errorCode, error.message);
          return throwError( () => new Error("Network error occurred."))
        })
      );
  }



}
