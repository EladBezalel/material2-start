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
      <mat-icon svgIcon="avatars:{{selectedAvatar}}" class="avatar"></mat-icon>
      <mat-form-field>
        <mat-select name="avatar" fxFlex placeholder="Avatar" [(ngModel)]="selectedAvatar">
          <mat-option *ngFor="let avatar of avatars; let i = index;" [value]="avatar">Avatar - {{i + 1}}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <mat-form-field>
      <input matInput ngModel name="name" placeholder="Full name" required>
    </mat-form-field>

    <mat-form-field>
      <textarea matInput ngModel name="details" placeholder="Details" rows="15" cols="60" required></textarea>
    </mat-form-field>

    <div fxLayout="row" fxLayoutGap="24px">
      <mat-checkbox ngModel name="isAdmin">Is Admin?</mat-checkbox>
      <mat-checkbox ngModel name="isCool">Is Cool?</mat-checkbox>
    </div>
  </div>
  <mat-dialog-actions align="end">
    <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
    <button mat-button color="accent">Save User</button>
  </mat-dialog-actions>
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
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  avatars = new Array(16).fill(0).map((_, i) => `svg-${i+1}`);
  selectedAvatar = this.avatars[0];

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
}

```

For components that are opened through the `MatDialog` service, the `MatDialogRef` can be injected
using Depndency Injection. Use the `MatDialogRef` token to close and deliver data back to the origin component.

###### File: `src/app/app.component.ts`

```ts
this.dialog.open(DialogComponent).afterClosed()
  .filter(result => !!result)
  .subscribe(user => {
    this.users.push(user);
    this.selectedUser = user;
  });
```

When opening a dialog using the `MatDialog` service, there will be a `afterClosed()` observable
that will contain the result data from the `MatDialogRef`.

###### File: `src/app/app.component.css`

```css
...

/deep/ mat-icon.avatar {
  ...
}
```

Currently the `avatar` icon in the dialog does not have the styles from the `avatar` class.

This is due to the fact that Angular encapsulates the selectors in components. Using the `/deep` 
prefix will ensure that the selector also matches elements outside of the current component.

--- 

[Go to Summary](../README.md#summary)
