#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* **Step 4 <-**
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #4 Task:

Here you will use the `MdIconRegistry` service provided by Material which allows us to add a namespace for a group of svg's.


###### File: `src/app/app.component.html`

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

###### File:  `src/app/app.component.ts`

```ts
import {Component} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }
}

```

###### File:  `src/app/app.component.css`

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

### Tips

#### 1. Deep CSS Operators

Using the `/deep/` prefix on selectors will cause the selector to be moved out of the view encapsulation.

#### 2.  List Items

Angular Material list items have a fixed height and won't expand to the height of the content.
    Overwriting and forcing the height to `auto` allows the avatar to take full height.

----


[Go to Tutorial Step 5](./STEP_5.md)
