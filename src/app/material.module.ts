import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdOptionModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdOptionModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdToolbarModule
  ]
})

export class AppMaterialModule { }
