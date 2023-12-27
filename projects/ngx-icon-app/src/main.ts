import { NgxIconService } from '@anedomansky/ngx-icon';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (iconService: NgxIconService) => () => {
        iconService.addIcon('cart', 'assets/');
        iconService.addIcon('camera', 'assets/');
      },
      deps: [NgxIconService],
      multi: true,
    },
  ],
});
