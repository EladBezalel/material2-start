import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  avatars = new Array(16).fill(0).map((_, i) => `svg-${i+1}`);
  selectedAvatar = this.avatars[0];

  constructor(public dialogRef: MdDialogRef<DialogComponent>) {}
}
