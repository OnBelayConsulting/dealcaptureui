import {Component, computed, DestroyRef, inject, input, signal} from '@angular/core';
import {DealSearchComponent} from "../../deals/deal-search/deal-search.component";
import {
  FormsModule
} from "@angular/forms";
import {Router} from '@angular/router';
import {DealSearchService} from '../../deals/services/deal-search.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {DealJobService} from '../../../services/deal-job.service';
import {PositionService} from '../../../services/position.service';
import {DealJobSnapshot} from '../model/deal-job.model';

@Component({
  selector: 'app-jobs-create',
    imports: [
        DealSearchComponent,
        FormsModule
    ],
  templateUrl: './jobs-create.component.html',
  styleUrl: './jobs-create.component.scss'
})
export class JobsCreateComponent {
  router = inject(Router);
  dealJobService = inject(DealJobService);
  destroyRef = inject(DestroyRef);
  dealSearchService = inject(DealSearchService);

  dealPositionService = inject(PositionService);

  previousCreatedDateTimes  = signal<string[] | null | undefined> ( undefined);


  jobTypeCode = input.required<string>();
  formTypeCode = computed<'Generation' | 'Valuation'>( () => {
    if (this.jobTypeCode() === 'DealPositionGeneration' || this.jobTypeCode() === 'PwrProfilePositionGeneration' )
      return 'Generation'
    else
      return 'Valuation'});

  showSearchFields = signal<boolean>(false);

  hasErrors = false;

  formErrors : string[] = [];

  transactionResult: TransactionResult | undefined = undefined;

  previousCreatedDateTime : string | undefined;

  modifiedSnapshot : DealJobSnapshot  =  {
    detail : {
      jobTypeCodeValue : ' ',
      jobStatusCodeValue: 'Pending',
      queryText: 'default',
      createdDateTime: undefined,
      currencyCodeValue: 'CAD',
      fromDate: undefined,
      toDate: undefined,
      volumeUnitOfMeasure: undefined,
      valuationDateTime: undefined
    },
  };

  ngOnInit(): void {
    this.modifiedSnapshot.detail.jobTypeCodeValue = this.jobTypeCode();
    this.getCreatedDateTimes();
  }

  private getCreatedDateTimes() {
    let subscription = this.dealPositionService.getCreatedDateTimes().subscribe({
      next: (data) => {
        this.previousCreatedDateTimes.set(data.createdDateTimeList);
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }



  onReset() {
    this.router.navigate(['jobs', 'list']);
  }


  onSubmit() {
    this.hasErrors = false;
    this.formErrors = [];

    if (this.formTypeCode() === 'Valuation') {
      if (!this.modifiedSnapshot.detail.createdDateTime) {
        if (this.previousCreatedDateTime) {
          this.modifiedSnapshot.detail.createdDateTime = this.previousCreatedDateTime;
        } else {
          this.hasErrors = true;
          this.formErrors.push("Created Date/Time must be entered or selected from previous date/times.")
        }
      }
    }

    if (this.modifiedSnapshot.detail.queryText == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Query text must not be null.")
    }
    if (this.modifiedSnapshot.detail.fromDate == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing from date.")
    }
    if (this.modifiedSnapshot.detail.toDate == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing to date.")
    }
    if (this.modifiedSnapshot.detail.currencyCodeValue == undefined) {
      this.hasErrors = true;
      this.formErrors.push("Missing currency.")
    }
    if (this.hasErrors)
      return;

    let subscription = this.dealJobService.create(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  onClose() {
    this.modifiedSnapshot!.detail.queryText = this.dealSearchService.searchCriteria();
  }

  onShowSearch() {
    this.showSearchFields.set(true);
  }
}
