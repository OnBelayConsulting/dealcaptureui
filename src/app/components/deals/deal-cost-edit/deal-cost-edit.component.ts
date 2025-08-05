import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {DealService} from '../../../services/deal.service';
import {DealCostSnapshot} from '../model/deal-cost.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-deal-cost-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './deal-cost-edit.component.html',
  styleUrl: './deal-cost-edit.component.scss'
})
export class DealCostEditComponent implements OnInit {

  dealService = inject(DealService);

  dealCostId = input<number | undefined>(undefined);

  dealId = input.required<number>();

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  transactionResult: TransactionResult | undefined = undefined;

  dealCostSnapshot : DealCostSnapshot = {
    errorCode: '0',
    errorMessage: ' ',
    entityState: 'NEW',
    entityId: {
      id: -1,
      code: ' '
    },
    detail : {
      costNameCodeValue : null,
      currencyCodeValue : null,
      unitOfMeasureCodeValue : null,
      costValue : 0
    }

  }

  myForm = new FormGroup({

    costNameCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    cost: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    currencyCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    unitOfMeasureCode: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })

  });



  ngOnInit(): void {
    this.dealCostSnapshot.dealId = {
      id : this.dealId()
    }
    if (this.dealCostId()) {
      let subscription = this.dealService.findDealCostById(this.dealCostId()!).subscribe({
        next: (data) => {
          console.log(data);
          this.dealCostSnapshot.version = data.version;
          this.dealCostSnapshot.entityId = {
            id: data.entityId!.id!
          }
          this.myForm.controls.costNameCode.setValue(data.detail!.costNameCodeValue);
          this.myForm.controls.cost.setValue(data.detail!.costValue);
          this.myForm.controls.currencyCode.setValue(data.detail!.currencyCodeValue);
          this.myForm.controls.unitOfMeasureCode.setValue(data.detail!.unitOfMeasureCodeValue);
          this.dealCostSnapshot.entityState = 'UNMODIFIED';
        },
        error: (error: Error) => {console.log(error.message)}
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe());

    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      console.log("invalid form");
    } else {
      let isModified = false;
      if (this.myForm.controls.costNameCode.dirty ) {
        this.dealCostSnapshot.detail!.costNameCodeValue = this.myForm.controls.costNameCode.value!
        isModified = true;
      }
      if (this.myForm.controls.cost.dirty ) {
        this.dealCostSnapshot.detail!.costValue = this.myForm.controls.cost.value!
        isModified = true;
      }
      if (this.myForm.controls.currencyCode.dirty ) {
        this.dealCostSnapshot.detail!.currencyCodeValue = this.myForm.controls.currencyCode.value!
        isModified = true;
      }
      if (this.myForm.controls.unitOfMeasureCode.dirty ) {
        this.dealCostSnapshot.detail!.unitOfMeasureCodeValue = this.myForm.controls.unitOfMeasureCode.value!
        isModified = true;
      }
      if (isModified)
        this.submitDealCost()
    }
  }

  onReset() {
    this.myForm.reset()
  }

  onCancel() {
    this.router.navigate(['deals', this.dealId(), 'dealCosts', 'list']);
  }

  private submitDealCost() {
    let subscription = this.dealService.saveDealCost(this.dealCostSnapshot).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


}
