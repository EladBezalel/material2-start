#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* **Step 9 <-**
* [Step 10](./STEP_10.md)

### Step #9 Task:

Creating an Angular Material dialog.

###### File: `src/app/app.component.html`

```html
  <mat-menu #themeMenu x-position="before">
    ...
  </mat-menu>

  <button mat-fab (click)="openAdminDialog()" class="fab-bottom-right">
    <mat-icon>add</mat-icon>
  </button>
```

A `fab` button at the bottom-right will be created to open the Angular Material dialog.

###### File:  `src/app/app.component.css`

```css
  ...
  
.fab-bottom-right {
position: fixed;
right: 16px;
bottom: 16px;
}
```

The `fab` button needs some styling to place it in the right spot.

###### File:  `src/app/app.component.ts`

```ts
import {MatIconRegistry, MatDialog} from '@angular/material';

import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ...

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dialog: MatDialog) {
    ...
  }

  private openAdminDialog() {
    this.dialog.open(DialogComponent);
  }

...
```

To be able to show dialogs, the `MatDialog` service needs to be injected. A function that is 
referenced from the template will then open the dialog.

###### File:  `src/app/dialog/dialog.component.ts`

```ts
import {Component} from '@angular/core';

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {}
```

###### File: `src/app/dialog/dialog.component.html`

```html
<h3 mat-dialog-title>Admin Dialog</h3>

<mat-dialog-content>
  This is the admin dialog.
</mat-dialog-content>
```

A dialog can be just a normal Angular component. You can use specific directives 
like `mat-dialog-title`, `mat-dialog-content` or `mat-dialog-actions` to style your dialog.

###### File: `src/app/app.module.ts`

```ts
...

import {DialogComponent} from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  ],
  ...
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Angular would not be able to compile the `DialogComponent` when calling `openAdminDialog` because
the dialog component is not part of the given `NgModule`.

---

[Go to Tutorial Step 10](./STEP_10.md)
