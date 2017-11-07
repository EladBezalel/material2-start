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
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #5 Task:

Let's add *Selected Us*er functionality and show the selected user details in our details container

###### File:  `src/app/app.component.html`

```html
<mat-sidenav mode="side" opened>

  <mat-tab-group>
    <mat-tab label="Users">
      <mat-nav-list>
        <mat-list-item *ngFor="let user of users" (click)="selectedUser = user">
          <mat-icon matListAvatar svgIcon="avatars:{{user.avatar}}" class="avatar"></mat-icon>
          <span>{{user.name}}</span>
        </mat-list-item>
      </mat-nav-list>
    </mat-tab>
    <mat-tab label="Settings">
      <span>Settings</span>
    </mat-tab>
  </mat-tab-group>

</mat-sidenav>
<div class="content">
   <mat-icon svgIcon="avatars:{{selectedUser.avatar}}" class="avatar"></mat-icon>
   <h2>{{selectedUser.name}}</h2>
   <p>{{selectedUser.details}}</p>
</div>
```

Let's select the first user from the users list for our initial view state

###### File:  `src/app/app.component.ts`

```ts
import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';

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

  selectedUser = this.users[0];

  ...
}

```

###### File:  `src/app/app.component.css`

```css
.content {
  padding: 12px;
}
```
---


[Go to Tutorial Step 6](./STEP_6.md)

