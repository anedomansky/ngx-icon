import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SampleServiceToken, NgxIconModule } from '@anedomansky/ngx-icon';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { AppSampleService } from './app/sample/sample.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxIconModule.forRoot({
        appTitle: 'App',
      }),
    ),
    provideRouter(APP_ROUTES),
    {
      provide: SampleServiceToken,
      useClass: AppSampleService,
    },
  ],
});
