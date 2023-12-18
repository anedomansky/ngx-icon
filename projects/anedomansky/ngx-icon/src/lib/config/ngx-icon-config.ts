import { InjectionToken } from '@angular/core';

export type NgxIconConfig = {
  appTitle: string;
};

export function getDefaultNgxIconConfig(): NgxIconConfig {
  return {
    appTitle: 'Ngx-icon',
  };
}

export const NgxIconConfigToken = new InjectionToken<NgxIconConfig>('NgxIconConfig');
