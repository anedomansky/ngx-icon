import { IconService, NgxIconModule } from '@anedomansky/ngx-icon';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(NgxIconModule),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (iconService: IconService) => () => {
        iconService.addIcon('cart', 'assets/');
        iconService.addIcon('camera', 'assets/');
      },
      deps: [IconService],
      multi: true,
    },
  ],
});
