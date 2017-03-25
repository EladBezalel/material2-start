#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* **Step 10 <-**

### Step #10 Task:

Creating a form inside of the Angular Material dialog.

###### File: `src/app/dialog/dialog.component.html`

```html
<h3>Add User Dialog</h3>
<form #form="ngForm" (ngSubmit)="dialogRef.close(form.value)" ngNativeValidate>
  <div fxLayout="column" fxLayoutGap="8px">
    <div fxLayout="row" fxLayoutAlign="start center">
      <md-icon svgIcon="avatars:{{selectedAvatar}}" class="avatar"></md-icon>
      <md-select name="avatar" fxFlex placeholder="Avatar" [(ngModel)]="selectedAvatar">
        <md-option *ngFor="let avatar of avatars; let i = index;" [value]="avatar">Avatar - {{i + 1}}</md-option>
      </md-select>
    </div>
    <md-input-container>
      <input mdInput ngModel name="name" placeholder="Full name" required>
    </md-input-container>

    <md-input-container>
      <textarea mdInput ngModel name="details" placeholder="Details" rows="15" cols="60" required></textarea>
    </md-input-container>

    <div fxLayout="row" fxLayoutGap="24px">
      <md-checkbox ngModel name="isAdmin">Is Admin?</md-checkbox>
      <md-checkbox ngModel name="isCool">Is Cool?</md-checkbox>
    </div>
  </div>
  <md-dialog-actions align="end">
    <button md-button type="button" (click)="dialogRef.close()">Cancel</button>
    <button md-button color="accent">Save User</button>
  </md-dialog-actions>
</form>
```

As soon as a `<form>` element is placed inside of a component, Angular will create an Angular form
automatically. 

##### Template-Driven Forms

The form will contain different Material components; each with a `ngModel` directive on it. All components that are registered through `ngModel` and have an according `name` attribute will be included in the form's value. Once the form is valid and the form is being submitted, the form's value can be delivered
back to the `AppComponent` and added to the array of `users`.


###### File:  `src/app/dialog/dialog.component.ts`

```ts
import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  avatars = new Array(16).fill(0).map((_, i) => `svg-${i+1}`);
  selectedAvatar = this.avatars[0];

  constructor(public dialogRef: MdDialogRef<DialogComponent>) {}
}

```

For components that are opened through the `MdDialog` service, the `MdDialogRef` can be injected
using Depndency Injection. Use the `MdDialogRef` token to close and deliver data back to the origin component.

###### File: `src/app/app.component.ts`

```ts
this.dialog.open(DialogComponent).afterClosed()
  .filter(result => !!result)
  .subscribe(user => {
    this.users.push(user);
    this.selectedUser = user;
  });
```

When opening a dialog using the `MdDialog` service, there will be a `afterClosed()` observable
that will contain the result data from the `MdDialogRef`.

###### File: `src/app/app.component.css`

```css
...

/deep/ md-icon.avatar {
  ...
}
```

Currently the `avatar` icon in the dialog does not have the styles from the `avatar` class.

This is due to the fact that Angular encapsulates the selectors in components. Using the `/deep` 
prefix will ensure that the selector also matches elements outside of the current component.

--- 

[Go to Summary](../README.md#summary)
