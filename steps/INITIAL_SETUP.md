#### Quick Jump ####
* **Initial Setup <-**
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_4.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

###### Initial Setup

Now let's review our initial setup:

`src/index.html`
```html
<head>
  <meta charset="utf-8">
  <title>Angular Material Start</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
```

`src/app/app.module.ts`
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

These files contain the basic application components and bootstrapping instructions for our application. 
*  The `index.html` file is the html entry point 
*  The `main.ts` is the Webpack entry point

> **Note:** The `angular-cli.json` file simply configures how angular-cli via webpack loads all of the files/libraries.

#### Next Step
[Go to Step 1](./STEP_1.md)
