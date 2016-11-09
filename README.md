# Angular Material2-Start

This branch contains the tutorial steps and processes used to implement the components-demo-app shown below:
![material-demo-ux](https://cloud.githubusercontent.com/assets/6004537/20249341/36670cf0-aa00-11e6-875e-e43731f41446.png)

Based on the starter-app:
![material-starter-ux2](https://cloud.githubusercontent.com/assets/6004537/20150979/0e7fd3e4-a6c1-11e6-85cd-b8a14ed35897.png)

Above is a snapshot of the Starter-App with a **Master-Detail** layout: showing a list of users
(left) and a user detail view (right).

Also shown is the user experience that will be displayed for smaller device sizes. The responsive
layout reveals the **menu** button that can be used to hide the user list. And the **share** button
can be used to show the Share bottom sheet view.

This Starter app demonstrates how:

*  Angular Material `fx-layout` and `fx-flex` options can easily configure HTML containers
*  Angular Material components `<md-toolbar>`, `<md-nav-list>`, and `<md-icon>` can quickly provide
   a base application structure
*  Theming can be altered/configured


This sample application is purposed as both a learning tool and a skeleton application for a typical
[Angular Material2](http://angular.io/) web app, comprised of a side navigation area and a
content area. You can use it to quickly bootstrap your angular webapp projects and dev environment
for these projects.

- - -

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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

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
export class AppModule { }

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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`src/main.less`
```css
@import '~@angular/material/core/theming/prebuilt/indigo-pink.css';
@import url(~"https://fonts.googleapis.com/css?family=Roboto:400,300");

html, body {
  margin: 0;
  background: #eee;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  height: 100%;
  flex-direction: column;
  display: flex;
}

app-root {
  flex-direction: column;
  display: flex;
  flex: 1;
}
```

> **Note:** We use flex properties on the `html` and `body` because they are not part of what angular bootstrap. This can be easily enough be fixed when bootstraping a component which his selector is `body`.

> **Note:** We import a prebuilt theme file, read [Theming your Angular Material app](https://github.com/angular/material2/blob/master/docs/theming.md) for more info
  
- - -

### Step #2:

Here we will use the wireframe planning and layout to identify the components and attributes needed.

* Add the `<md-toolbar>`, `<md-sidenav-layout>`, `<md-sidenav>` containers

  > **Note:** The `<md-sidenav>` is the container for the Users **master list** view, and for now a simple
  `<div>` is the container for the User **detail** view.
  
* Add the **fx-layout** and **fx-flex** attributes to configure the container layouts and sizing aspects
* Use `mode="side"` and `opened` to lock the sidenav open on the left

`src/app/app.component.html`
```html
<div fx-layout="column" fx-flex>
  <md-toolbar color="primary">
    <span>Angular Material 2 - Starter App</span>
  </md-toolbar>
  <md-sidenav-layout fx-layout="row" fx-flex>
    <md-sidenav mode="side" opened>
      side!
    </md-sidenav>
    <div class="details" fx-flex>
      details!
    </div>
  </md-sidenav-layout>
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
<div fx-layout="column" fx-flex>
  <md-toolbar color="primary">
    <span>Angular Material 2 - Starter App</span>
  </md-toolbar>
  <md-sidenav-layout fx-layout="row" fx-flex>
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
    <div class="details" fx-flex>
      details!
    </div>
  </md-sidenav-layout>
</div>
```

Adding users list

`src/app/app.component.ts`
```ts
import { Component } from '@angular/core';

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
<div fx-layout="column" fx-flex>
  <md-toolbar color="primary">
    <span>Angular Material 2 - Starter App</span>
  </md-toolbar>
  <md-sidenav-layout fx-layout="row" fx-flex>
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
    <div class="details" fx-flex>
      details!
    </div>
  </md-sidenav-layout>
</div>
```

By using the `addSvgIconSetInNamespace` function we provide a namespace that can be used with `md-icon` 
and the location of that svg group.
By that, we can have `<md-icon svgIcon="[namespace]:[id]">` and it would look the namespace and the id in it.

`src/app/app.component.ts`
```ts
import { Component } from '@angular/core';
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

  constructor(iconRegistry: MdIconRegistry) {
    iconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }
}

```

`src/main.less`
```ts
@import '~@angular/material/core/theming/prebuilt/indigo-pink.css';
@import url(~"https://fonts.googleapis.com/css?family=Material+Icons");
@import url(~"https://fonts.googleapis.com/css?family=Roboto:400,300");

html, body {
  margin: 0;
  background: #eee;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  height: 100%;
  flex-direction: column;
  display: flex;
}

app-root {
  flex-direction: column;
  display: flex;
  flex: 1;
}

.avatar {
  position: relative;
  width: 128px;
  height: 128px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
  margin: 0;
  vertical-align: middle;
  zoom: 0.70;
  transform: translateZ(0);
  -webkit-transform: scale(0.70);
  -moz-transform: scale(0.70);
}

.md-list-item {
  height: initial!important;
}
```
> **Note:** added `.avatar` class over here so it can be global for the entire app and used later in our details view,
    - I could have had it in the `app.component` and have it on [`None Encapsulation Mode`](https://angular.io/docs/ts/latest/guide/component-styles.html#!#view-encapsulation) but i preferred it that way.
    
> **Note:** I override and force `.md-list-item` to take the avatar height within it.

- - -

### Step #5:

Here we will add a selected user functionality and show the selected user details in our details container

`src/app/app.component.html`
```html
<div fx-layout="column" fx-flex>
  <md-toolbar color="primary">
    <span>Angular Material 2 - Starter App</span>
  </md-toolbar>
  <md-sidenav-layout fx-layout="row" fx-flex>
    <md-sidenav mode="side" opened>
      <md-tab-group>
        <md-tab label="Users">
          <md-nav-list>
            <md-list-item *ngFor="let user of users" (click)="selectedUser = user">
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
    <div class="details" fx-flex>
      <md-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></md-icon>
      <h2>{{selectedUser.name}}</h2>
      <p>{{selectedUser.details}}</p>
    </div>
  </md-sidenav-layout>
</div>
```

Using the first user from the users list for the initial state

`src/app/app.component.ts`
```ts
import { Component } from '@angular/core';
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

  selectedUser = {};

  constructor(iconRegistry: MdIconRegistry) {
    iconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');

    this.selectedUser = this.users[0];
  }
}

```

- - -

### Step #6:

Here we will use `md-slide-toggle` that depend on the `hammerjs` framework.

We need to include this in our `app.module.ts` file so material can use it.

Hammerjs handles all the user interactions and gestures for material and simplifies the api.

`src/app/app.component.html`
```html
<div fx-layout="column" fx-flex>
  <md-toolbar color="primary">
    <span>Angular Material 2 - Starter App</span>
  </md-toolbar>
  <md-sidenav-layout fx-layout="row" fx-flex>
    <md-sidenav mode="side" opened>
      <md-tab-group>
        <md-tab label="Users">
          <md-nav-list>
            <md-list-item *ngFor="let user of users" (click)="selectedUser = user">
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
    <div class="details" fx-flex fx-layout="column" fx-layout.gt-sm="row">
      <md-card fx-flex="80">
        <md-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></md-icon>
        <h2>{{selectedUser.name}}</h2>
        <p>{{selectedUser.details}}</p>
      </md-card>
      <md-card fx-flex>
        <md-slide-toggle [(ngModel)]="selectedUser.isAdmin">Admin?</md-slide-toggle>
        <md-slide-toggle [(ngModel)]="selectedUser.isCool">Coooool??</md-slide-toggle>
      </md-card>
    </div>
  </md-sidenav-layout>
</div>
```
> **Note:** We use `fx-layout.gt-sm="row"` which tells this container to be a row container when the screen is greater
than the `sm` breakpoint (`960px`)

Adding `8px` margin for cards

`src/app/app.component.less`
```css
 md-sidenav {
   width: 320px;
 }
 
 md-card {
   margin: 8px;
 }
```

Including `hammerjs` dependency

`src/app/app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
- - -

### Step #7:

Add themes with the [theming mixins](https://github.com/angular/material2/blob/master/docs/theming.md) provided by material

`src/themes.scss`
```scss
@import '~@angular/material/core/theming/all-theme';

@include md-core();

$primary: md-palette($md-red);
$accent: md-palette($md-blue);

$theme: md-light-theme($primary, $accent);

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
        "main.less",
        "themes.scss"
      ]
    }
  ]
}
```
- - -

### Step #8 - final:

Adding a dark theme and a menu with a button to toggle the theme 

`src/themes.scss`
```scss
@import '~@angular/material/core/theming/all-theme';

@include md-core();

$primary: md-palette($md-red);
$accent: md-palette($md-blue);

$theme: md-light-theme($primary, $accent);

@include angular-material-theme($theme);

.dark-theme {
  $dark-primary: md-palette($md-purple);
  $dark-accent: md-palette($md-green);

  $dark-theme: md-dark-theme($dark-primary, $dark-accent);

  @include angular-material-theme($dark-theme);
}
```

Notice that we have a button with `[md-menu-trigger-for]` attribute that points what menu to open,
By setting the value `menu` for that attribute, we find an element with that name
which happens to be `<md-menu #menu>`, and by clicking the trigger element, the menu would be opened

`src/app/app.component.html`
```html
<div fx-layout="column" fx-flex [class.dark-theme]="isDarkTheme">
  <md-toolbar color="primary">
    <div fx-layout="row" fx-flex fx-layout-align="space-between">
      <span>Angular Material 2 - Starter App</span>
      <button md-icon-button [md-menu-trigger-for]="menu">
        <md-icon>more_vert</md-icon>
      </button>
    </div>
  </md-toolbar>
  <md-menu #menu x-position="before">
    <button md-menu-item (click)="isDarkTheme = !isDarkTheme">Dark Theme</button>
  </md-menu>
  <md-sidenav-layout fx-layout="row" fx-flex>
    <md-sidenav mode="side" opened>
      <md-tab-group>
        <md-tab label="Users">
          <md-nav-list>
            <md-list-item *ngFor="let user of users" (click)="selectedUser = user">
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
    <div class="details" fx-flex fx-layout="column" fx-layout.gt-sm="row">
      <md-card fx-flex="80">
        <md-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></md-icon>
        <h2>{{selectedUser.name}}</h2>
        <p>{{selectedUser.details}}</p>
      </md-card>
      <md-card fx-flex>
        <md-slide-toggle [(ngModel)]="selectedUser.isAdmin">Admin?</md-slide-toggle>
        <md-slide-toggle [(ngModel)]="selectedUser.isCool">Coooool??</md-slide-toggle>
      </md-card>
    </div>
  </md-sidenav-layout>
</div>
```

Adding dark theme default value to be false

`src/app/app.component.ts`
```ts
import { Component } from '@angular/core';
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

  selectedUser = {};

  isDarkTheme = false;

  constructor(iconRegistry: MdIconRegistry) {
    iconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');

    this.selectedUser = this.users[0];
  }
}
```

- - -

## Summary

With only eight (8) Tutorial Steps and a few minutes of work, we have quickly created a functional
Angular Material application that is beautiful, responsive, theme'ed, accessible, component-based,
and easily maintained.
