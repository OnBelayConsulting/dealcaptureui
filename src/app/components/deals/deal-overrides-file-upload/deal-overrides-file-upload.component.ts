import {Component, DestroyRef, inject, output} from '@angular/core';
import {DealService} from '../../../services/deal.service';
import {TransactionResult} from '../../../models/transactionresult.model';

@Component({
  selector: 'app-deal-overrides-file-upload',
  imports: [],
  templateUrl: './deal-overrides-file-upload.component.html',
  styleUrl: './deal-overrides-file-upload.component.scss'
})
export class DealOverridesFileUploadComponent {

  destroyRef = inject(DestroyRef);
  dealService = inject(DealService);
  transactionResult: TransactionResult | undefined = undefined;
  close = output<boolean>();

  onFileSelected(event : any) {
    console.log(event)
    const formData = new FormData();
    const file:File = event.target.files[0];

    formData.append("file", file, 'dealoverrides.csv');
    this.uploadFile(formData);
  }

  onClose() {
    this.close.emit(true);

  }

  private  uploadFile(formData: FormData) {
    let subscription = this.dealService.uploadDealFile(formData).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }



}
