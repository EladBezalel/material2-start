#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* **Step 3 <-**
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #3 Task:

Here you will have a tab group that will contain the users list within a nav-list component

###### File:  `src/app/app.component.html`

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
<img src="https://cloud.githubusercontent.com/assets/6004537/24765471/24c1f7c8-1ab5-11e7-8a7d-555d78dfda59.png" width="50%">


Adding [users](https://github.com/EladBezalel/material2-start/blob/workshop/src/app/app.component.ts#L14-L74) to the sidebar list

###### File:  `src/app/app.component.ts`

```ts
import {Component} from '@angular/core';

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
}

```

----

[Go to Tutorial Step 4](./STEP_4.md)
