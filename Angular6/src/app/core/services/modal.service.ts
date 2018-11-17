import { Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

//   constructor(private dialogRef: MatDialogRef<any>, public dialog: MatDialog) { }

  private modals: any[] = [];

//   closeModal() {
//     this.dialogRef.close();
//   }

  add(modal: any) {
      // add modal to array of active modals
      this.modals.push(modal);
  }

  remove(id: string) {
      // remove modal from array of active modals
      this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
      // open modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.open();
  }

  close(id: string) {
      // close modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }
}
