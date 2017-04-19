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

* Add the `<md-toolbar>`, `<md-sidenav-container>`, `<md-sidenav>` containers

  > **Note:** The `<md-sidenav>` is the container for the Users **master list** view, and for now a simple
  `<div>` is the container for the User **detail** view.
  
* Add the **fxLayout** and **fxFlex** attributes to configure the container layouts and sizing aspects
* Use `mode="side"` and `opened` to lock the sidenav open on the left

###### File: `src/app/app.component.html`

```html
<div fxLayout="column" fxFlex>

  <md-toolbar color="primary">
    <span>Angular Material</span>
  </md-toolbar>

  <md-sidenav-container fxFlex>
    <md-sidenav mode="side" opened>
      Sidenav
    </md-sidenav>
    <div class="content">
      Page Content
    </div>
  </md-sidenav-container>

</div>
```

Giving the host element a flex property of `1` to fill height and sidenav a default width of `320px`

###### File:  `src/app/app.component.css`

```css
:host {
  display: flex;
  flex: 1;
}

md-sidenav {
  width: 320px;
}
```

---
  
[Go to Tutorial Step 3](./STEP_3.md)
