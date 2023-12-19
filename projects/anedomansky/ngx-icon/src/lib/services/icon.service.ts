import { HttpClient } from '@angular/common/http';
import { inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';

import { SVGIcon } from '../models/SVGIcon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly httpClient = inject(HttpClient);

  private readonly sanitizer = inject(DomSanitizer);

  private icons = new Map<string, SVGIcon>();

  addIcon(name: string, path: SafeResourceUrl): void {
    this.icons.set(name, new SVGIcon(path, null));
  }

  getIcon(name: string): Observable<SVGElement> {
    const icon = this.icons.get(name);

    if (icon) {
      return this.loadIcon(icon);
    }

    return throwError(
      () => new Error(`Unable to find icon with the name "${name}"`)
    );
  }

  private prepareCachedIcon(iconAsText: string): SVGElement {}

  private fetchIcon(icon: SVGIcon): Observable<SVGElement> {
    const { path } = icon;

    const safePath = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      path
    );

    if (!safePath) {
      return throwError(
        () =>
          new Error(`The path "${safePath}" was not trusted as a resource URL`)
      );
    }

    // TODO: https://github.com/angular/components/blob/main/src/material/icon/icon-registry.ts#L667C16-L667C37
    return this.httpClient.get(safePath, { responseType: 'text' });
  }

  private loadIcon(icon: SVGIcon): Observable<SVGElement> {
    if (icon.elementAsText) {
      return of(this.prepareCachedIcon(icon.elementAsText));
    }

    return this.fetchIcon(icon);
  }
}
