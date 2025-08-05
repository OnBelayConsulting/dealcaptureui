import {Component, DestroyRef, inject, output} from '@angular/core';
import {TransactionResult} from '../../../models/transactionresult.model';
import {DealService} from '../../../services/deal.service';

@Component({
  selector: 'app-deal-file-upload',
  imports: [],
  templateUrl: './deal-file-upload.component.html',
  styleUrl: './deal-file-upload.component.scss'
})
export class DealFileUploadComponent {

  destroyRef = inject(DestroyRef);
  dealService = inject(DealService);
  transactionResult: TransactionResult | undefined = undefined;
  close = output<boolean>();

  onFileSelected(event : any) {
    console.log(event)
    const formData = new FormData();
    const file:File = event.target.files[0];

    formData.append("file", file, 'deals.csv');
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
