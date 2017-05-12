#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* **Step 1 <-**
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_4.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #1 Task:

Here you will install Angular Material in your Angular application.

* Import `MaterialModule` from `@angular/material` and use it inside the imports
* Since Angular Material depends on animations, the `BrowserAnimationsModule` needs to be included as well.

> Since we will also be using flexbox CSS, let's also include the `@angular/flex-layout` library.

```terminal
npm install @angular/material @angular/flex-layout --save
```

Modify the following files to use Angular Material and FlexLayout in the application.

###### File: `src/app/app.module.ts`


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

###### File: `src/styles.css`

```css
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
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
### Tips

#### 1. FlexLayout + Body

We use flex properties on the `html` and `body` because they are not part of what markup `<app-root>Loading...</app-root>` that Angular bootstraps. This can be easily enough be fixed when bootstraping a component that has `body` as selector. 

###### File: `src/app/app.component.ts`

```js
@Component({
  selector: 'body',
  template: '<h1> {{title}} </h1>'
})
export class AppComponent {
  title = 'Angular Material Workshop';
}
```

#### 2. Themes

We import a prebuilt theme file, read [Theming your Angular Material app](https://github.com/angular/material2/blob/master/guides/theming.md) for more info



---
  
[Go to Tutorial Step 2](./STEP_2.md)
