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

#### Next Step
[Go to Step 4](./STEP_4.md)
