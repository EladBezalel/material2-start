#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* **Step 6 <-**
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)

### Step #6:

Here we will use a `md-slide-toggle` component from Angular Material.

`src/app/app.component.html`
```html
...

<div class="content" fxLayout="row" fxLayout.sm="column" fxLayoutGap="16px">

  <md-card fxFlex="80">
    <md-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></md-icon>
    <h2>{{selectedUser.name}}</h2>
    <p>{{selectedUser.details}}</p>
  </md-card>

  <md-card fxFlex fxLayout="column">
    <md-slide-toggle [(ngModel)]="selectedUser.isAdmin">Is Admin?</md-slide-toggle>
    <md-slide-toggle [(ngModel)]="selectedUser.isCool">Is Cool?</md-slide-toggle>
  </md-card>

</div>

...
```

> **Note:** Using `fxLayout.sm="column"` tells the content to be a column container when the screen is small (breakpoint `960px`)

Specifying a gap between the different children can be done by using 
[`fxLayoutGap`](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview) with a value of `16px`.

---

`src/app/app.module.ts`
```ts
...

import 'hammerjs';

...
```

HammerJS handles all the user interactions and gestures for Material and simplifies the API.

Including the `hammerjs` package in our Angular application using Webpack.

#### Next Step
[Go to Step 7](./STEP_7.md)
