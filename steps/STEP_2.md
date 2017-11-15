#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* **Step 2 <-**
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* [Step 7](./STEP_7.md)
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #2 Task:

Here we will use the wireframe planning and layout to identify the components and attributes needed.

* Add the `<mat-toolbar>`, `<mat-sidenav-container>`, `<mat-sidenav>` containers

  > **Note:** The `<mat-sidenav>` is the container for the Users **master list** view, and for now a simple
  `<div>` is the container for the User **detail** view.
  
* Add the **fxLayout** and **fxFlex** attributes to configure the container layouts and sizing aspects
* Use `mode="side"` and `opened` to lock the sidenav open on the left

###### File: `src/app/app.component.html`

```html
<div fxLayout="column" fxFlex>

  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Angular Material</span>
    </mat-toolbar-row>
  </mat-toolbar>

  <mat-sidenav-container fxFlex>
    <mat-sidenav mode="side" opened>
      Sidenav
    </mat-sidenav>
    <div class="content">
      Page Content
    </div>
  </mat-sidenav-container>

</div>
```

Giving the host element a flex property of `1` to fill height and sidenav a default width of `320px`

###### File:  `src/app/app.component.css`

```css
:host {
  display: flex;
  flex: 1;
}

mat-sidenav {
  width: 320px;
}
```

---
  
[Go to Tutorial Step 3](./STEP_3.md)
