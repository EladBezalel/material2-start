#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* **Step 5 <-**
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)

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

#### Next Step
[Go to Step 6](./STEP_6.md)

