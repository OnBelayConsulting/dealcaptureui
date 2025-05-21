import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {OrganizationService} from '../services/organization.service';
import {OrganizationSnapshot} from '../model/organization.model';
import {TransactionResult} from '../../../models/transactionresult.model';

@Component({
  selector: 'app-organization-edit',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './organization-edit.component.html',
  styleUrl: './organization-edit.component.scss'
})
export class OrganizationEditComponent implements OnInit {
  router = inject(Router);
  organizationService = inject(OrganizationService);
  destroyRef = inject(DestroyRef);

  organizationId = input<number>(-1);

  transactionResult: TransactionResult | undefined = undefined;

  private organizationSnapshot: OrganizationSnapshot | null = null;

  private modifiedSnapshot: OrganizationSnapshot = {
    entityState: 'NEW',
    entityId: {
      id: undefined
    },
    version: -1,
    detail: {
      shortName: undefined,
      legalName: undefined
    }
  }


  myForm = new FormGroup({

    shortName: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    }),
    legalName: new FormControl<string | undefined>(undefined, {
      validators: [
        Validators.required,
      ],
    })


  });

  ngOnInit(): void {
    if (this.organizationId && this.organizationId() > 0) {
      let subscriber = this.organizationService.findOrganizationById(this.organizationId()).subscribe( {
        next: value => {
          if (value) {
            this.organizationSnapshot = value;
            this.modifiedSnapshot.entityState = 'UNMODIFIED';
            this.modifiedSnapshot.version = this.organizationSnapshot.version;
            this.modifiedSnapshot.entityId = {
              id: this.organizationSnapshot.entityId!.id
            };
            this.myForm.controls.shortName.setValue(this.organizationSnapshot.detail!.shortName!);
            if (this.organizationSnapshot.detail?.legalName)
              this.myForm.controls.legalName.setValue(this.organizationSnapshot.detail?.legalName!);
          } else {
            this.router.navigate(['organizations', 'list']);

          }
        },
        error: err => {
          this.router.navigate(['organizations', 'list']);
        }
      });

      this.destroyRef.onDestroy(subscriber.unsubscribe);

    } else {
      this.organizationSnapshot = {
        entityState: 'NEW',
        detail: {
          shortName: '<shortName>',
          legalName: ""
        }

      }
    }

  }


  onReset() {
    this.router.navigate(['organizations', 'list']);
  }


  onSubmit() {
    console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log("invalid form");
    } else {
      let wasModified = false;
      if (this.myForm.controls.shortName.dirty && this.myForm.controls.shortName.value != null) {
        this.modifiedSnapshot.detail!.shortName = this.myForm.controls.shortName.value;
        wasModified = true;
      }
      if (this.myForm.controls.legalName.dirty && this.myForm.controls.legalName.value != null) {
        this.modifiedSnapshot!.detail!.legalName = this.myForm.controls.legalName.value;
        wasModified = true;
      }
      this.submitOrganization(wasModified);
    }
  }

  private submitOrganization(wasModified: boolean) {
    if (wasModified && this.modifiedSnapshot!.entityState === 'UNMODIFIED') {
      this.modifiedSnapshot.entityState = 'MODIFIED';
    }
    let subscription = this.organizationService.saveOrganization(this.modifiedSnapshot!).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


}
