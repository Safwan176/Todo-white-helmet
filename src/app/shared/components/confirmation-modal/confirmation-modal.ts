import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.html',
  styleUrls: ['./confirmation-modal.scss']
})
export class ConfirmationModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

}
