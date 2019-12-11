import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-alert-modal',
  templateUrl: 'alert-modal.component.html',
  styleUrls: ['alert-modal.component.scss'],
})
export class AlertModalComponent {

  @Input() title: string;
  @Input() text: string;
  @Input() buttonText: string;

  constructor(protected ref: NbDialogRef<AlertModalComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
