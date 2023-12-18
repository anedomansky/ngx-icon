import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  getDefaultNgxIconConfig,
  NgxIconConfig,
  NgxIconConfigToken,
} from './config/ngx-icon-config';
import { SampleServiceToken } from './core/services/sample/sample.config';
import { SampleService } from './core/services/sample/sample.service';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [],
  imports: [SampleComponent],
  providers: [
    {
      provide: SampleServiceToken,
      useClass: SampleService,
    },
    {
      provide: NgxIconConfigToken,
      useValue: getDefaultNgxIconConfig(),
    },
  ],
  exports: [SampleComponent],
})
export class NgxIconModule {
  static forRoot(config: NgxIconConfig): ModuleWithProviders<NgxIconModule> {
    return {
      ngModule: NgxIconModule,
      providers: [
        {
          provide: NgxIconConfigToken,
          useValue: config,
        },
      ],
    };
  }
}
