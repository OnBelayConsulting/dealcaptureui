import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrganizationService} from '../services/organization.service';
import {Router} from '@angular/router';
import {TransactionResult} from '../../../models/transactionresult.model';
import {CompanyRoleSnapshot, CounterpartyRoleSnapshot} from '../model/organization.model';

@Component({
  selector: 'app-counterpartyrole-edit',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './counterpartyrole-edit.component.html',
  styleUrl: './counterpartyrole-edit.component.scss'
})
export class CounterpartyRoleEditComponent implements OnInit {
  organizationId = input.required<number>()
  organizationService = inject(OrganizationService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  action = signal<string>('new');

  transactionResult: TransactionResult | undefined = undefined;

  counterpartyRole : CounterpartyRoleSnapshot = {
    errorCode: '0',
    errorMessage: ' ',
    entityState: 'NEW',
    organizationRoleTypeValue: 'CP',
    roleDetail: {
      organizationRoleStatusValue: undefined
    },
    entityId: {
      id: -1,
      code: ' '
    },
    detail : {
      settlementCurrencyCodeValue: undefined
    }
  }


  myForm = new FormGroup({

    roleStatus: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    settlementCurrencyCodeValue: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })

  });


  ngOnInit(): void {
    let subscription = this.organizationService.findOrganizationById(this.organizationId()).subscribe({
      next: (data) => {
        console.log(data);
        if (data.counterpartyRoleSnapshot) {
          this.counterpartyRole.entityId = {
            id: data.counterpartyRoleSnapshot!.entityId!.id
          };
          this.counterpartyRole.version = data.counterpartyRoleSnapshot.version;

          this.counterpartyRole.entityState = 'UNMODIFIED';
          this.action.set('edit');
        } else {
          this.myForm.controls.roleStatus.setValue('P');
          this.counterpartyRole.entityState = 'NEW';

        }
      },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  onSave() {
    if (this.myForm.invalid == false) {
      let isModified = false;
      if (!this.myForm.controls.roleStatus.invalid && this.myForm.controls.roleStatus.dirty) {
        this.counterpartyRole.roleDetail = {
          organizationRoleStatusValue: this.myForm.controls.roleStatus.value!
        };
        isModified = true;
      }
      if (!this.myForm.controls.settlementCurrencyCodeValue.invalid && this.myForm.controls.settlementCurrencyCodeValue.dirty) {
        this.counterpartyRole.detail = {
          settlementCurrencyCodeValue: this.myForm.controls.settlementCurrencyCodeValue.value!
        };
        isModified = true;
      }

      if (isModified && this.counterpartyRole.entityState === 'UNMODIFIED') {
        this.counterpartyRole.entityState = 'MODIFIED';
      }
      this.submitOrganizationRole();
    }
  }

  onReset() {
    this.router.navigate(['organizations', 'list']);
  }



  private submitOrganizationRole() {
    let subscription = this.organizationService.saveOrganizationRole(this.organizationId(), [this.counterpartyRole]).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


}
