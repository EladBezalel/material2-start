import '@angular2-material/core/style/core.css';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";

import {MdButtonModule} from '@angular2-material/button';
import {MdCoreModule} from '@angular2-material/core';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';
import {MdIconModule} from '@angular2-material/icon';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    /* Material 2 Modules */
    MdCoreModule,
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
