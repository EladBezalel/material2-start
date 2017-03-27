#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* **Step 1 <-**
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)

### Step #1:

Here you will install Angular Material in your Angular application.

* Import `MaterialModule` from `@angular/material` and use it inside the imports
* Since Angular Material depends on animations, the `BrowserAnimationsModule` needs to be included as well.

Notice we also use `@angular/flex-layout` module to have a flex layout system

`src/app/app.module.ts`
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

`src/main.less`
```css
@import '~@angular/material/core/theming/prebuilt/indigo-pink.css';
@import "https://fonts.googleapis.com/css?family=Material+Icons";
@import "https://fonts.googleapis.com/css?family=Roboto:400,300";

html, body {
  display: flex;
  flex-direction: column;

  font-family: Roboto, Arial, sans-serif;
  margin: 0;
  height: 100%;
}
```

> **Note:** We use flex properties on the `html` and `body` because they are not part of what angular bootstrap. This can be easily enough be fixed when bootstraping a component that has `body` as selector.

> **Note:** We import a prebuilt theme file, read [Theming your Angular Material app](https://github.com/angular/material2/blob/master/docs/theming.md) for more info
  
#### Next Step
[Go to Step 2](./STEP_2.md)
