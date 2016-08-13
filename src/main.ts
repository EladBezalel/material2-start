/* Import styles */
import '@angular2-material/core/style/core.css';
import './main.css';

/* Import all required libraries */
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StartAppComponent} from './components/app/app.component';
import {MdButtonModule} from '@angular2-material/button';
import {MdCoreModule} from '@angular2-material/core';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdListModule} from '@angular2-material/list';
import {MdIconModule} from '@angular2-material/icon';

@NgModule({

  imports: [
    BrowserModule,

    /* Material 2 Modules */
    MdCoreModule,
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
  ],

  declarations: [StartAppComponent],
  bootstrap: [StartAppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);