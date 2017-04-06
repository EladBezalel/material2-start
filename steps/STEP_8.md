#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* **Step 8 <-**
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #8 Task:

Add a dark theme and a menu with a button to toggle the theme: 

###### File: `src/theme.scss`

```scss
@import '~@angular/material/_theming';

@include mat-core();

$primary: mat-palette($mat-red);
$accent: mat-palette($mat-blue);

$theme: mat-light-theme($primary, $accent);

@include angular-material-theme($theme);

.dark-theme {
  $dark-primary: mat-palette($mat-light-blue);
  $dark-accent: mat-palette($mat-green);

  $dark-theme: mat-dark-theme($dark-primary, $dark-accent);

  @include angular-material-theme($dark-theme);
}

```

Notice that we have a button with `[mdMenuTriggerFor]` attribute that points what menu to open,
By setting the value `menu` for that attribute, we find an element with that name
which happens to be `<md-menu #menu>`, and by clicking the trigger element, the menu would be opened

###### File: `src/app/app.component.html`

```html
<div fxLayout="column" fxFlex [class.dark-theme]="isDarkTheme">

  <md-toolbar color="primary">
    <span>Angular Material</span>

    <!-- Filler that pushes the menu button to the end of the toolbar -->
    <span fxFlex></span>

    <button md-icon-button [mdMenuTriggerFor]="themeMenu">
      <md-icon>more_vert</md-icon>
    </button>

  </md-toolbar>

  <md-sidenav-container fxFlex fxLayout="row">
    ...
  </md-sidenav-container>
  
  <md-menu #themeMenu x-position="before">
    <button md-menu-item (click)="isDarkTheme = !isDarkTheme">Toggle Theme</button>
  </md-menu>
</div>
```

Also notice we're using `md-icon` again, but this time we're passing a ligature name that will be resovled out of the Material Icons font that we [imported in the `styles.css`](https://github.com/EladBezalel/material2-start/blob/workshop/src/styles.css#L1), you can see the full list of icons ligatures [here](https://material.io/icons/)

Add a dark theme default value to  `false`

###### File: `src/app/app.component.ts`

```ts
import {Component} from '@angular/core';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ...

  isDarkTheme = false;

  ...
}
```

---

[Go to Tutorial Step 9](./STEP_9.md)
