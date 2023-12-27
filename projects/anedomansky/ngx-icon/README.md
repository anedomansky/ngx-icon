# Ngx-icon

[![npm version](https://badge.fury.io/js/@anedomansky%2Fngx-icon.svg)](https://badge.fury.io/js/@anedomansky%2Fngx-icon)

An Angular component for displaying SVG icons.

## Features

- display any SVG icon
- add custom CSS to the SVG icons
- automatic caching of previously added icons

## Dependencies

| ngx-icon | Angular |
| -------- | ------- |
| current  | >= 16   |

## Installation

```cli
npm install @anedomansky/ngx-icon
```

## Setup

You have to add all your icons to the `NgxIconService` in order to display them.
Please remove all `height` and `width` attributes from the `<svg>` element beforehand.
Furthermore, you have to provide the `HttpClient` in your application.

`main.ts`:

```ts
import { NgxIconService } from "@anedomansky/ngx-icon";
import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (iconService: NgxIconService) => () => {
        iconService.addIcon("cart", "assets/");
        iconService.addIcon("camera", "assets/");
      },
      deps: [NgxIconService],
      multi: true,
    },
  ],
});
```

## Usage

`app.component.html`:

```html
<div class="app">
  <ngx-icon name="cart"></ngx-icon>
  <ngx-icon name="camera"></ngx-icon>
</div>
```

`app.component.ts`:

```ts
import { NgxIconComponent } from "@anedomansky/ngx-icon";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [NgxIconComponent],
})
export class AppComponent {}
```

## Customization

You can alter the appearance (height, width, etc.) of the icons.

Additionally, there is a CSS Custom Property for the icon's `height` that can easily be updated.

`app.component.scss`:

```scss
.app ::ng-deep ngx-icon {
  --ngx-icon-size: 2rem;
}
```
