import {Component, inject, input, output} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';

@Component({
    selector: 'app-info-modal',
    standalone: true,
    templateUrl: './info-modal.component.html',
    styleUrl: './info-modal.component.css',
    imports: [ModalComponent]
})
export class InfoModalComponent {
  title = input<string>();
  message = input<string>();
  closeEvent = output<boolean>();

  onClose() {
    this.closeEvent.emit(true);
  }
}
