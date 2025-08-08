import {Component, DestroyRef, inject, input, signal} from '@angular/core';
import {Router} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {DealOverrideDaySnapshot, DealOverrideMonthSnapshot} from '../model/deal-overrides.model';
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
  formReady = signal<boolean>(false);
  monthDate = input.required<string>();

  dealOverridesMonthSnapshot : DealOverrideMonthSnapshot | undefined = undefined ;

  transactionResult: TransactionResult | undefined = undefined;

  hasErrors = false;

  formErrors : string[] = [];

  myForm = new FormGroup({
    days : new FormArray([
      new FormGroup({
        overrideDay: new FormControl<string>(''),
        overrideValues : new FormArray([
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null),
          new FormControl<number | null>(null)
        ])
      }),
    ])
  })

  ngOnInit(): void {
    let subscription  =this.dealService.getDealOverridesByMonth(this.dealId(), this.monthDate()).subscribe({
      next: (data) => {
        this.dealOverridesMonthSnapshot = data;
        this.buildForm();
        this.formReady.set(true);
      },
      error: err => console.log(err)
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());
  }

  private buildForm() {
    if (this.dealOverridesMonthSnapshot) {
      let override = this.dealOverridesMonthSnapshot.overrideDays[0];

      this.myForm.controls.days.at(0).controls.overrideDay.setValue(override.overrideDate);
      for (let j=0; j < this.dealOverridesMonthSnapshot.headings!.length; j++) {
        this.myForm.controls.days.at(0).controls.overrideValues.at(j).setValue(override.values[j]);
      }
      this.buildDayOverrides(this.dealOverridesMonthSnapshot.overrideDays);
    }

  }


  private buildDayOverrides(overrides : DealOverrideDaySnapshot[]) {
    for (let i = 1; i < overrides.length; i++) {
      let override = overrides[i];
      this.myForm.controls.days.push(
        new FormGroup({
          overrideDay: new FormControl<string | null>(override.overrideDate),
          overrideValues: new FormArray([
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null),
            new FormControl<number | null>(null)
          ])
        })
      );
      for ( let k = 0; k < override.values.length; k++) {
        this.myForm.controls.days.at(i).controls.overrideValues.at(k).setValue(override.values[k]);
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
      for (let j=0; j <this.dealOverridesMonthSnapshot!.headings!.length; j++) {
        if (this.myForm.controls.days.at(i).controls.overrideValues.at(j).dirty) {
          wasModified = true;
          if (this.myForm.controls.days.at(i).controls.overrideValues.at(j).value)
            dayOverride!.values[j] = this.myForm.controls.days.at(i).controls.overrideValues.at(j).value!;
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
    this.onReset();
  }

}
