import {Component, DestroyRef, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {DealOverrideMonthSnapshot} from '../model/deal-overrides.model';
import {TransactionResult} from '../../../models/transactionresult.model';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-deal-overrides-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './deal-overrides-edit.component.html',
  styleUrl: './deal-overrides-edit.component.scss'
})
export class DealOverridesEditComponent {
  router = inject(Router);
  dealService = inject(DealService);
  destroyRef = inject(DestroyRef);

  dealId = input.required<number>();

  monthDate = input.required<string>();

  dealOverridesMonthSnapshot : DealOverrideMonthSnapshot | undefined = undefined ;

  transactionResult: TransactionResult | undefined = undefined;

  hasErrors = false;

  formErrors : string[] = [];

  myForm = new FormGroup({
    days : new FormArray([
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      }),
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        price: new FormControl<number | undefined>(undefined),
        quantity: new FormControl<number | undefined>(undefined),
        costOverrides : new FormArray([
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined),
          new FormControl<number | undefined>(undefined)
        ])
      })
    ])
  });

  ngOnInit(): void {
    let subscription  =this.dealService.getDealOverridesByMonth(this.dealId(), this.monthDate()).subscribe({
      next: (data) => {
        this.dealOverridesMonthSnapshot = data;
        this.buildForm();
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  private buildForm() {

    if (this.dealOverridesMonthSnapshot) {
      for (let i = 0; i < this.dealOverridesMonthSnapshot.overrideDays.length; i++) {
        let override = this.dealOverridesMonthSnapshot.overrideDays[i];
        this.myForm.controls.days.at(i).controls.overrideDay.setValue(override.overrideDate);
        this.myForm.controls.days.at(i).controls.price.setValue(override.values.at(0));
        this.myForm.controls.days.at(i).controls.quantity.setValue(override.values.at(1));
        for (let j=2; j < this.dealOverridesMonthSnapshot.headings!.length; j++) {
          this.myForm.controls.days.at(i).controls.costOverrides.at(j).setValue(override.values.at(i));
        }
      }
    }
  }

  onReset() {
    this.router.navigate(['deals', this.dealId(),'overrides','list']);
  }

  onSubmit() {
    this.hasErrors = false;
    this.formErrors = [];
    console.log(this.myForm);
    let wasModified = false;
    if (this.myForm.invalid) {
      console.log("invalid form");
      this.hasErrors = true;
    } else {
      wasModified = this.populateSnapshot()
    }
    if (wasModified)
      this.submitOverrides()
  }

  private populateSnapshot() {
    let wasModified = false;
    for (let i=0; i < this.dealOverridesMonthSnapshot!.overrideDays.length; i++) {
      let dayOverride = this.dealOverridesMonthSnapshot?.overrideDays.at(i);
      if (this.myForm.controls.days.at(i).controls.price.dirty) {
        wasModified = true;
        if (this.myForm.controls.days.at(i).controls.price)
          dayOverride!.values[0] = this.myForm.controls.days.at(i).controls.price.value!;
        else
          dayOverride!.values[0] = null;
      }
      if (this.myForm.controls.days.at(i).controls.quantity.dirty) {
        wasModified = true;
        if (this.myForm.controls.days.at(i).controls.quantity)
          dayOverride!.values[1] = this.myForm.controls.days.at(i).controls.quantity.value!;
        else
          dayOverride!.values[1] = null;
      }
      for (let j=2; j <this.dealOverridesMonthSnapshot!.headings!.length; j++) {
        if (this.myForm.controls.days.at(i).controls.costOverrides.at(j).dirty) {
          if (this.myForm.controls.days.at(i).controls.costOverrides.at(j).value)
            dayOverride!.values[j] = this.myForm.controls.days.at(i).controls.costOverrides.at(j).value!;
          else
            dayOverride!.values[j] = null;
        }
      }
    }
    return wasModified;
  }

  private submitOverrides() {
    this.dealOverridesMonthSnapshot!.entityState = 'MODIFIED';

    let subscription = this.dealService.saveDealOverridesByMonth(this.dealOverridesMonthSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());


  }

  onCancel() {

  }

}
