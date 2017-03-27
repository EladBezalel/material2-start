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

### Step #8:

Adding a dark theme and a menu with a button to toggle the theme 

`src/themes.scss`
```scss
@import '~@angular/material/core/theming/all-theme';

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

Notice that we have a button with `[md-menu-trigger-for]` attribute that points what menu to open,
By setting the value `menu` for that attribute, we find an element with that name
which happens to be `<md-menu #menu>`, and by clicking the trigger element, the menu would be opened

`src/app/app.component.html`
```html
<div fxLayout="column" fxFlex [class.dark-theme]="isDarkTheme">

  <md-toolbar color="primary">
    <span>Angular Material</span>

    <!-- Filler that pushes the menu button to the end of the toolbar -->
    <span fxFlex></span>

    <button md-icon-button [md-menu-trigger-for]="themeMenu">
      <md-icon>more_vert</md-icon>
    </button>

  </md-toolbar>

  <md-sidenav-container fxFlex fxLayout="row">
    ...
  </md-sidenav-layout>
  
  <md-menu #themeMenu x-position="before">
    <button md-menu-item (click)="isDarkTheme = !isDarkTheme">Toggle Theme</button>
  </md-menu>
</div>
```

Adding dark theme default value to be false

`src/app/app.component.ts`
```ts
import {Component} from '@angular/core';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  ...

  isDarkTheme = false;

  ...
}
```

#### Next Step
[Go to Summary](../README.md#summary)
