import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AlertModalComponent } from '../@theme/components';

@Injectable({
  providedIn: 'root',
})
export class UiService {

  constructor(
    public dialogService: NbDialogService,
  ) { }

  presentAlert(messages) {
    this.dialogService.open(AlertModalComponent, {
      context: {
        title: messages.title,
        text: messages.text,
        buttonText: messages.buttonText,
        isError: messages.isError,
      },
    });
  }

}
