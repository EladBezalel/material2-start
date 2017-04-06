#### Quick Jump ####
* [Initial Setup](./INITIAL_SETUP.md)
* [Step 1](./STEP_1.md)
* [Step 2](./STEP_2.md)
* [Step 3](./STEP_3.md)
* [Step 4](./STEP_4.md)
* [Step 5](./STEP_5.md)
* [Step 6](./STEP_6.md)
* **Step 7 <-**
* [Step 8](./STEP_8.md)
* [Step 9](./STEP_9.md)
* [Step 10](./STEP_10.md)

### Step #7 Task:

Add themes with the [theming mixins](https://github.com/angular/material2/blob/master/docs/theming.md) provided by Material.

###### File: `src/theme.scss`

```scss
@import '~@angular/material/_theming';

@include mat-core();

$primary: mat-palette($mat-red);
$accent: mat-palette($mat-blue);

$theme: mat-light-theme($primary, $accent);

@include angular-material-theme($theme);
```

You can choose your palettes out of the [Material Design Color Palettes spec](https://material.io/guidelines/style/color.html)

Tell **angular-cli** to also compile the themes file, because angular-cli uses webpack,
The Angular CLI has a built-in plugin to compile scss for us, so all we have to do is include it in the styles section.

###### File: `angular-cli.json`

```json
{
  "apps": [
    {
      "styles": [
        "styles.css",
        "theme.scss"
      ]
    }
  ]
}
```

> The prebuilt theme that has been included in *Step 1* is now unused and can be deleted.

### Tips

#### 1. Angular CLI

The Angular CLI won't notice the changes in the `angular-cli.json` file. Restarting the
  serve task will do the trick.

---

[Go to Tutorial Step 8](./STEP_8.md)
