# Angular Material 2 Start

This branch contains the tutorial steps and processes used to implement the components-demo-app shown below:

<img width="928" alt="ccf1dd30be16625f475e8a348c89e11f" src="https://cloud.githubusercontent.com/assets/4987015/24325016/1e649250-1191-11e7-8b4e-27aad9f996a2.png">

Above is a snapshot of the Starter-App with a **Master-Detail** layout: showing a list of users
(left) and a user detail view (right).

This Starter app demonstrates how:

*  Flex-Layout directives `fxLayout` and `fxFlex` can easily setup HTML containers
*  Angular Material components `<md-toolbar>`, `<md-nav-list>`, and `<md-icon>` can quickly provide
   a base application structure
*  Theming can be altered/configured


This sample application is purposed as both a learning tool and a skeleton application for a typical
[Angular Material2](http://angular.io/) web app, comprised of a side navigation area and a
content area. You can use it to quickly bootstrap your angular webapp projects and dev environment
for these projects.

- - -

#### Quick Jump ####
* [Step 1](#step-1)
* [Step 2](#step-2)
* [Step 3](#step-3)
* [Step 4](#step-4)
* [Step 5](#step-5)
* [Step 6](#step-6)
* [Step 7](#step-7)
* [Step 8](#step-8)

#### "How to build an App"

Here are some generalized steps that may be used to conceptualize the application implementation
process:

1. Plan your layout and the components you want to use

2. Use hard-coded HTML and mock content to make sure the components appear as desired

3. Wire components to your application logic

4. Add Responsive breakpoints

5. Add Theming support

6. Confirm ARIA compliance

7. Write End-to-end (e2e) Tests

   > It is important to validate your application logic with Angular Material UI components.

###### Wirefame

The illustration below shows how we planned the layout and identified the primary components that
will be used in the Starter app:

![plancomponents2](https://cloud.githubusercontent.com/assets/6004537/20150970/05ae3f26-a6c1-11e6-981f-53032ae41e57.png)

- - -

###### Prerequisites

This tutorial assumes that you have already cloned the repository and executed the following
commands:

* `npm install`
* `ng serve`

###### Tutorial Layout

You will notice a few files/directories within this tutorial:

 1. `src/app` - This is where all of your application files will be created and edited.
 3. `src/assets` - This folder contains some tutorial-provided images and icons which are used by
    the application.

These folders and files will be used to guide you through the development process. By following
these tutorial steps, you will be very quickly introduced to the powerful features of Angular
Material.

We encourage you to walk through each step yourself and build the application from the ground up.
However, if you get stuck or want to start from a clean slate, each step has an associated Git tag 
that you can checkout to reset your code to match the start of the associated step in the tutorial.

For instance, to start on Step 3, run `git checkout step-3`. Also note that `step-1` is the same as
the `tutorial` branch.

> **Note:** In some of the Steps in this README, we have abbreviated some of the HTML or JavaScript
  in order to show what is being added or changed, so you may not be able copy & paste every example
  into your code. If you wish to start fresh, use the Git tags as described above.

The available step tags (in order) are:

- `comp-step-0` == initial setup by `angular-cli`
- `comp-step-1` == start of `components-demo-tutorial`
- `comp-step-2`
- `comp-step-3`
- `comp-step-4`
- `comp-step-5`
- `comp-step-6`
- `comp-step-7` 
- `comp-final` == `components-demo`

###### Initial Setup

Now let's review our initial setup:

`src/index.html`
```html
<head>
  <meta charset="utf-8">
  <title>Angular Material 2 Start</title>
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

These files contain the basic building blocks of, and bootstrapping for our application. The
`index.html` file is the html entry point and `main.ts` is the javascript entry point;

> **Note:** The `angular-cli.json` file simply configures how angular-cli via webpack loads all of the files/libraries.

- - -

### Step #1:

Here you will modify the application to use Angular-Material2.

* Import `MaterialModule` from `@angular/material` and use it inside the imports

Notice we also use `@angular/flex-layout` module to have a flex layout system

`src/app/app.module.ts`
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule
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
  
- - -

### Step #2:

Here we will use the wireframe planning and layout to identify the components and attributes needed.

* Add the `<md-toolbar>`, `<md-sidenav-layout>`, `<md-sidenav>` containers

  > **Note:** The `<md-sidenav>` is the container for the Users **master list** view, and for now a simple
  `<div>` is the container for the User **detail** view.
  
* Add the **fxLayout** and **fxFlex** attributes to configure the container layouts and sizing aspects
* Use `mode="side"` and `opened` to lock the sidenav open on the left

`src/app/app.component.html`
```html
<div fxLayout="column" fxFlex>

  <md-toolbar color="primary">
    <span>Angular Material</span>
  </md-toolbar>

  <md-sidenav-container fxFlex fxLayout="row">
    <md-sidenav mode="side" opened>
      Sidenav
    </md-sidenav>
    <div class="content">
      Page Content
    </div>
  </md-sidenav-container>

</div>
```

Giving the sidenav a default width of `320px`

`src/app/app.component.less`
```css
md-sidenav {
  width: 320px;
}
```
- - -

### Step #3:

Here you will have a tab group that will contain the users list within a nav-list component

`src/app/app.component.html`
```html
...
  <md-sidenav mode="side" opened>
  
    <md-tab-group>
      <md-tab label="Users">
        <md-nav-list>
          <md-list-item *ngFor="let user of users">
            <span>{{user.name}}</span>
          </md-list-item>
        </md-nav-list>
      </md-tab>
      <md-tab label="Settings">
        <span>Settings</span>
      </md-tab>
    </md-tab-group>
  
  </md-sidenav>
...
```

Adding users list

`src/app/app.component.ts`
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, ...',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum ...',
      isAdmin: false,
      isCool: true
    }
    // ...
  ];
}

```
- - -

### Step #4:

Here you will use the `MdIconRegistry` service provided by Material which allows us to add a namespace for a group of svg's.


`src/app/app.component.html`
```html
...
  <md-sidenav mode="side" opened>
  
    <md-tab-group>
      <md-tab label="Users">
        <md-nav-list>
          <md-list-item *ngFor="let user of users">
            <md-icon svgIcon="avatars:{{user.avatar}}" class="avatar"></md-icon>
            <span>{{user.name}}</span>
          </md-list-item>
        </md-nav-list>
      </md-tab>
      <md-tab label="Settings">
        <span>Settings</span>
      </md-tab>
    </md-tab-group>
  
  </md-sidenav>
...
```

By using the `addSvgIconSetInNamespace` function we provide a namespace that can be used with `md-icon` 
and the location of that svg group.
By that, we can have `<md-icon svgIcon="[namespace]:[id]">` and it would look the namespace and the id in it.

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
  users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, ...',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum ...',
      isAdmin: false,
      isCool: true
    }
    // ...
  ];

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    let avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }
}

```

`src/app/app.component.css`
```css
...

.avatar {
  overflow: hidden;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 12px;
}

/deep/ .mat-list-item-content {
  height: auto !important;
}
```
> **Note** 
> * Using the `/deep/` prefix on selectors will cause the selector to be moved out of 
   the view encapsulation.
> * Angular Material list items have a fixed height and won't expand to the height of the content.
    Overwriting and forcing the height to `auto` allows the avatar to take full height.

- - -

### Step #5:

Here we will add a selected user functionality and show the selected user details in our details container

`src/app/app.component.html`
```html
<md-sidenav mode="side" opened>

  <md-tab-group>
    <md-tab label="Users">
      <md-nav-list>
+       <md-list-item *ngFor="let user of users" (click)="selectedUser = user">
          <md-icon svgIcon="avatars:{{user.avatar}}" class="avatar"></md-icon>
          <span>{{user.name}}</span>
        </md-list-item>
      </md-nav-list>
    </md-tab>
    <md-tab label="Settings">
      <span>Settings</span>
    </md-tab>
  </md-tab-group>

</md-sidenav>
<div class="content">
+  <md-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></md-icon>
+  <h2>{{selectedUser.name}}</h2>
+  <p>{{selectedUser.details}}</p>
</div>
```

Using the first user from the users list for the initial state

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
  users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, ...',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum ...',
      isAdmin: false,
      isCool: true
    }
    // ...
  ];

  selectedUser = this.users[0];

  ...
}

```

`src/app/app.component.css`
```css
.content {
  padding: 12px;
}
```

- - -

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

  <md-card fxFlex>
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

- - -

### Step #7:

Add themes with the [theming mixins](https://github.com/angular/material2/blob/master/docs/theming.md) provided by Material.

`src/themes.scss`
```scss
@import '~@angular/material/core/theming/all-theme';

@include mat-core();

$primary: mat-palette($mat-red);
$accent: mat-palette($mat-blue);

$theme: mat-light-theme($primary, $accent);

@include angular-material-theme($theme);
```

Telling angular-cli to also compile the themes file, because angular-cli uses webpack,
It has a built-in plugin to compile scss for us, so all we have to do is include it in the styles section

`angular-cli.json`
```json
{
  "apps": [
    {
      "styles": [
        "styles.css",
        "themes.scss"
      ]
    }
  ]
}
```

> The prebuilt theme that has been included in *Step 1* is now unused and can be deleted.

**Note**: The Angular CLI won't notice the changes in the `angular-cli.json` file. Restarting the
  serve task will do the trick.
- - -

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

- - -

## Summary

With only eight (8) Tutorial Steps and a few minutes of work, we have quickly created a functional
Angular Material application that is beautiful, responsive, theme'ed, accessible, component-based,
and easily maintained.
