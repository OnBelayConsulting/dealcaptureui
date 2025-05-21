import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrganizationService} from '../services/organization.service';
import {CompanyRoleSnapshot} from '../model/organization.model';
import {TransactionResult} from '../../../models/transactionresult.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-companyrole-edit',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './companyrole-edit.component.html',
  styleUrl: './companyrole-edit.component.scss'
})
export class CompanyRoleEditComponent implements OnInit {
  organizationId = input.required<number>();

  organizationService = inject(OrganizationService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  action = signal<string>('new');

  transactionResult: TransactionResult | undefined = undefined;

  companyRole : CompanyRoleSnapshot = {
    errorCode: '0',
    errorMessage: ' ',
    entityState: 'NEW',
    organizationRoleTypeValue: 'CO',
    roleDetail: {
      organizationRoleStatusValue: undefined,
    },
    entityId: {
      id: -1,
      code: ' '
    },
    detail : {
      isHoldingParent: undefined
    }
  };

  myForm = new FormGroup({

    roleStatus: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    isHoldingParent: new FormControl<boolean | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })

  });


    ngOnInit(): void {
    let subscription = this.organizationService.findOrganizationById(this.organizationId()).subscribe({
      next: (data) => {
          console.log(data);
          if (data.companyRoleSnapshot) {
            this.companyRole.version = data.companyRoleSnapshot.version;
            this.companyRole.entityId = {
              id: data.companyRoleSnapshot!.entityId!.id!
            };
            this.myForm.controls.roleStatus.setValue(data.companyRoleSnapshot!.roleDetail!.organizationRoleStatusValue);
            this.myForm.controls.isHoldingParent.setValue(data.companyRoleSnapshot!.detail!.isHoldingParent);
            this.companyRole.entityState = 'UNMODIFIED';
            this.action.set('edit');
          } else {
            this.myForm.controls.roleStatus.setValue('P');
            this.myForm.controls.roleStatus.markAsDirty();
            this.myForm.controls.isHoldingParent.setValue(false);
            this.myForm.controls.isHoldingParent.markAsDirty();
            this.companyRole.entityState = 'NEW';
          }
        },
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }



  onSave() {
    if (this.myForm.invalid == false) {
      let isModified = false;
      if (!this.myForm.controls.roleStatus.invalid && this.myForm.controls.roleStatus.dirty ) {
        this.companyRole.roleDetail = {
          organizationRoleStatusValue: this.myForm.controls.roleStatus.value!
        };
        isModified = true;
      }
      if (!this.myForm.controls.isHoldingParent.invalid && this.myForm.controls.isHoldingParent.dirty ) {
        this.companyRole.detail = {
          isHoldingParent: this.myForm.controls.isHoldingParent.value!
        };
        isModified = true;
      }

      if (isModified && this.companyRole.entityState === 'UNMODIFIED') {
        this.companyRole.entityState = 'MODIFIED';
      }

      this.submitOrganizationRole();
    }
  }


  onReset() {
    this.router.navigate(['organizations', 'list']);
  }



  private submitOrganizationRole() {
    let subscription = this.organizationService.saveOrganizationRole(this.organizationId(), [this.companyRole]).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


}
