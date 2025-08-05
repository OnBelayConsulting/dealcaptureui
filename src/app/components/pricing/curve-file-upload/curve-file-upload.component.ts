import {Component, DestroyRef, inject, input, output} from '@angular/core';
import {PriceIndexService} from '../../../services/price-index.service';
import {TransactionResult} from '../../../models/transactionresult.model';
import {FxIndexService} from '../../../services/fx-index.service';
import {InterestIndexService} from '../../../services/interest-rate-index.service';

@Component({
  selector: 'app-curve-file-upload',
  imports: [],
  templateUrl: './curve-file-upload.component.html',
  styleUrl: './curve-file-upload.component.scss'
})
export class CurveFileUploadComponent {

  destroyRef = inject(DestroyRef);
  uploadType = input.required<'price' | 'fx' | 'interest'>();

  priceIndexService = inject(PriceIndexService);
  fxIndexService = inject(FxIndexService);
  interestIndexService = inject(InterestIndexService);

  transactionResult: TransactionResult | undefined = undefined;
  close = output<boolean>();

  onFileSelected(event : any) {
    console.log(event)
    const formData = new FormData();
    const file: File = event.target.files[0];

    switch (this.uploadType()) {
      case "price":
        this.uploadPriceCurveFile(formData, file);
        break;
      case "fx":
        this.uploadFxCurveFile(formData, file);
        break;
      case "interest":
        this.uploadInterestCurveFile(formData, file);
        break;
    }
  }

  onClose() {
    this.close.emit(true);

  }

  private  uploadPriceCurveFile(formData: FormData, file : File) {
    formData.append("file", file, 'pricecurves.csv');
    let subscription = this.priceIndexService.uploadCurveFile(formData).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  private  uploadFxCurveFile(formData: FormData, file : File) {
    formData.append("file", file, 'fxcurves.csv');
    let subscription = this.fxIndexService.uploadCurveFile(formData).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }


  private  uploadInterestCurveFile(formData: FormData, file : File) {
    formData.append("file", file, 'interestcurves.csv');
    let subscription = this.interestIndexService.uploadCurveFile(formData).subscribe({
      next: (data) => {this.transactionResult = data},
      error: (error: Error) => {console.log(error.message)}
    });

    this.destroyRef.onDestroy( () => subscription.unsubscribe());

  }

}
