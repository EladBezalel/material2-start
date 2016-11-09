# Angular Material2-Start

This branch contains the tutorial steps and processes used to implement the start-app shown below:

![material-starter-ux2](https://cloud.githubusercontent.com/assets/6004537/20150979/0e7fd3e4-a6c1-11e6-85cd-b8a14ed35897.png)

Above is a snapshot of the Starter-App with a **Master-Detail** layout: showing a list of users
(left) and a user detail view (right).

~~Also shown is the user experience that will be displayed for smaller device sizes. The responsive
layout reveals the **menu** button that can be used to hide the user list. And the **share** button
can be used to show the Share bottom sheet view.~~ would be supported in future releases.

This Starter app demonstrates how:

*  Angular Material `fx-layout` and `fx-flex` options can easily configure HTML containers
*  Angular Material components `<md-toolbar>`, `<md-nav-list>`, and `<md-icon>` can quickly provide
   a base application structure
*  ~~Theming can be altered/configured~~


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

<br/>
![plancomponents2](https://cloud.githubusercontent.com/assets/6004537/20150970/05ae3f26-a6c1-11e6-981f-53032ae41e57.png)

- - -

###### Prerequisites

This tutorial assumes that you have already cloned the repository and executed the following
commands:

* `npm install`
* `npm run dev`

###### Tutorial Layout

You will notice a few files/directories within this tutorial:

 1. `src/app` - This is where all of your application files will be created and edited.
 2. `src/app/components` - This folder contains some tutorial-provided services and views for you to
    reuse.
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

- `step-1` == `tutorial`
- `step-2`
- `step-3`
- `step-4`
- `step-5`
- `step-6`
- `step-7`
- `step-8`
- `step-9`
- `step-9-finished` == `master`

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
* Use `mode="side"` and `opened="true"` to lock the sidenav open on the left

`src/app/app.component.html`
```html
<md-toolbar color="primary">
  <span>Angular Material 2 - Starter App</span>
</md-toolbar>
<md-sidenav-layout fx-flex fx-layout="row">
  <md-sidenav mode="side" opened="true">
    {{title}}
  </md-sidenav>

  <div class="content" fx-flex>
    hello!
  </div>
</md-sidenav-layout>
```

`src/app/app.component.less`
```css
md-sidenav {
  width: 320px;
}
```
- - -

### Step #3:

Here you will use hard-coded elements to confirm rendering and layout of the container child
elements and Angular Material components.

`src/app/app.component.html`
```html
<md-toolbar color="primary">
  <span>Angular Material 2 - Starter App</span>
</md-toolbar>
<md-sidenav-layout fx-flex fx-layout="row">
  <md-sidenav mode="side" opened="true">
    <md-nav-list>
      <md-list-item>
        <md-icon svgSrc="../assets/avatar-1.svg" class="avatar"></md-icon>
        <span>Lia Lugo</span>
      </md-list-item>
      <md-list-item>
        <md-icon svgSrc="../assets/avatar-4.svg" class="avatar"></md-icon>
        <span>Lawrance Ray</span>
      </md-list-item>
    </md-nav-list>
  </md-sidenav>

  <div class="content" fx-flex>
    <md-icon svgSrc="../assets/avatar-1.svg" class="avatar"></md-icon>
    <h2>Lia Lugo</h2>
    <p>Lorem Ipsum ...</p>
  </div>
</md-sidenav-layout>
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
```
- - -

### Step #4:

Here you integrate your custom, application logic.

* `app.component.ts` internally loads the Users service
* `User.model.ts` defines your user model
* `users.service.ts` mockes your users data service

`src/app/models/User.model.ts`
```ts
export class User {
  name: string;
  avatar: string;
  details: string;
}
```

`src/app/services/users.service.ts`
```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/User.model';

const USERS: User[] = [
  {
    name: 'Lia Lugo',
    avatar: 'svg-1',
    details: '...'
  },
  {
    name: 'George Duke',
    avatar: 'svg-2',
    details: '...'
  }, 
  // and so on...
];

@Injectable()
export class UsersService {
  private _list = Observable.of(USERS);

  loadAll() {
    return this._list;
  }
}
```

`src/app/app.component.ts`
```ts
import {Component, OnInit} from '@angular/core';
import {User} from './models/User.model';
import {UsersService} from './services/users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ UsersService ]
})
export class AppComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.loadAll();
  }
}
```

- - -

### Step #5:

Here you will replace the hardcoded HTML with dynamic markup using Angular directives
(eg `ngFor`) and `{{ }}` interpolation markup to utilize the User and App functionality we just
imported in Step #4.

* Use dynamic HTML that will be compiled and rendered by Angular
* Register a custom icon set of 'user' avatars for the user list

`src/app/app.component.html`
```html
<md-toolbar color="primary">
  <span>Angular Material 2 - Starter App</span>
</md-toolbar>
<md-sidenav-layout fx-flex fx-layout="row">
  <md-sidenav mode="side" opened="true">
    <md-nav-list>
      <md-list-item *ngFor="let user of users | async;trackBy:user?.name">
        <md-icon svgIcon="avatars:{{user.avatar}}" class="avatar"></md-icon>
        <span>{{user.name}}</span>
      </md-list-item>
    </md-nav-list>
  </md-sidenav>

  <div class="content" fx-flex>
    <md-icon svgSrc="../assets/avatar-1.svg" class="avatar"></md-icon>
    <h2>Lia Lugo</h2>
    <p>Lorem Ipsum ...</p>
  </div>
</md-sidenav-layout>
```
> **Note:** The `async` pipe is automatically subscribes for changes at the `users` property and unsubscribes when the element
 is destroyed

`src/app/app.component.ts`
```ts
import {Component, OnInit} from '@angular/core';
import {User} from './models/User.model';
import {UsersService} from './services/users.service';
import {Observable} from 'rxjs';

import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ UsersService, MdIconRegistry ]
})
export class AppComponent implements OnInit {
  users: Observable<User[]>;

  constructor(mdIconRegistry: MdIconRegistry, private usersService: UsersService) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }

  ngOnInit(): void {
    this.users = this.usersService.loadAll();
  }
}
```

- - -

### ~~Step #6:~~

~~Here you will add responsive breakpoints so the application layout will adapt to different device
display sizes~~

Will be supported in future releases.

- - -

### Step #7:

Here you will refactor your HTML and code to create the `<users-list>` and `<user-details>` components.

#### users-list
`src/app/components/users-list/users-list.component.ts`
```ts
import {Component, Input} from '@angular/core';
import {User} from '../../models/User.model';

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.less']
})
export class UsersListComponent {
  @Input() users: User[];
}
```

`src/app/components/users-list/users-list.component.html`
```html
<md-nav-list>
  <md-list-item *ngFor="let user of users;trackBy:user?.name">
    <md-icon svgIcon="avatars:{{user.avatar}}" class="avatar"></md-icon>
    <span>{{user.name}}</span>
  </md-list-item>
</md-nav-list>
```

`src/app/components/users-list/users-list.component.less`
```css
:host {
  /deep/ md-nav-list md-list-item .md-list-item {
    height: initial;
  }
}
```

#### user-details
`src/app/components/user-details/user-details.component.ts`
```ts
import {Component, Input} from '@angular/core';
import {User} from '../../models/User.model';

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.less']
})
export class UserDetailsComponent {
  @Input() user: User;
}
```

`src/app/components/user-details/user-details.component.html`
```html
<md-icon svgIcon="avatars:{{user?.avatar}}" class="avatar"></md-icon>
<h2>{{user?.name}}</h2>
<p>{{user?.details}}</p>
```

`src/app/components/user-details/user-details.component.less`
```css
:host {
  padding: 10px 40px;
}
```
- - -

### Step #8:

Here you use the components you created above

`src/app/app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserDetailsComponent
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

`src/app/app.component.html`
```html
<md-toolbar color="primary">
  <span>Angular Material 2 - Starter App</span>
</md-toolbar>
<md-sidenav-layout fx-flex fx-layout="row">
  <md-sidenav mode="side" opened="true">
    <users-list [users]="users | async"></users-list>
  </md-sidenav>

  <user-details [user]="users[0]" fx-flex fx-layout="column"></user-details>
</md-sidenav-layout>
```

> **Note:** We passed `users[0]` to `user-details` in the next step we're going to support the user selection

- - -

### Step #9:

Here you make a selected user functionallity that will change the user `user-details` gets.

`src/app/app.component.ts`
```ts
import {Component, OnInit} from '@angular/core';
import {User} from './models/User.model';
import {UsersService} from './services/users.service';
import {Observable} from 'rxjs';

import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [ UsersService, MdIconRegistry ]
})
export class AppComponent implements OnInit {
  users: Observable<User[]>;
  selectedUser: User;

  constructor(mdIconRegistry: MdIconRegistry, private usersService: UsersService,) {
    mdIconRegistry.addSvgIconSetInNamespace('avatars', './assets/avatars.svg');
  }

  ngOnInit(): void {
    this.users = this.usersService.loadAll().map(users => {
      this.selectedUser = users[0];

      return users;
    });
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }
}
```
> **Note:** We added a `selectedUser` property and initialize it when the users loaded

Creating an EventEmitter so we can emit that a user was selected
`src/app/components/users-list/users-list.component.ts`
```ts
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../models/User.model';

@Component({
  selector: 'users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.less']
})
export class UsersListComponent {
  @Input() users: User[];

  @Output() selected: EventEmitter<User> = new EventEmitter<User>();

  onSelect(user: User) {
    this.selected.emit(user);
  }
}
```

`src/app/components/users-list/users-list.component.html`
```html
<md-nav-list>
  <md-list-item *ngFor="let user of users;trackBy:user?.name"
                (click)="onSelect(user)">
    <md-icon svgIcon="avatars:{{user.avatar}}" class="avatar"></md-icon>
    <span>{{user.name}}</span>
  </md-list-item>
</md-nav-list>
```

`src/app/app.component.html`
```html
<md-toolbar color="primary">
  <span>Angular Material 2 - Starter App</span>
</md-toolbar>
<md-sidenav-layout fx-flex fx-layout="row">
  <md-sidenav mode="side" opened="true">
    <users-list [users]="users | async" (selected)="onUserSelected($event)"></users-list>
  </md-sidenav>

  <user-details [user]="selectedUser" fx-flex fx-layout="column"></user-details>
</md-sidenav-layout>
```
- - -

## Summary

With only nine (9) Tutorial Steps and a few minutes of work, we have quickly created a functional
Angular Material application that is beautiful, responsive, theme'ed, accessible, component-based,
and easily maintained.
