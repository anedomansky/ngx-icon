import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable, of, tap, throwError } from 'rxjs';

import { SVGIcon } from '../models/SVGIcon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly httpClient = inject(HttpClient);

  private readonly document = inject(DOCUMENT);

  private readonly sanitizer = inject(DomSanitizer);

  private icons = new Map<string, SVGIcon>();

  addIcon(name: string, path: SafeResourceUrl): void {
    this.icons.set(
      name,
      new SVGIcon(
        this.sanitizer.bypassSecurityTrustResourceUrl(`${path}${name}.svg`),
        null,
      ),
    );
  }

  getIcon(name: string): Observable<SVGElement> {
    const icon = this.icons.get(name);

    if (icon) {
      return this.loadIcon(icon);
    }

    return throwError(
      () => new Error(`Unable to find icon with the name "${name}"`),
    );
  }

  private createSVGFromString(iconAsString: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = iconAsString;
    const svg = div.getElementsByTagName('svg')[0];

    if (!svg) {
      throw new Error('<svg> not found');
    }

    return svg;
  }

  private prepareCachedIcon(iconAsString: string): SVGElement {
    return this.createSVGFromString(iconAsString);
  }

  private fetchIcon(icon: SVGIcon): Observable<string> {
    const { path } = icon;

    const safePath = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      path,
    );

    if (!safePath) {
      return throwError(
        () =>
          new Error(`The path "${safePath}" was not trusted as a resource URL`),
      );
    }

    return this.httpClient.get(safePath, { responseType: 'text' });
  }

  private transformStringToSVGElement(icon: SVGIcon): SVGElement {
    if (!icon.element) {
      icon.element = this.createSVGFromString(icon.elementAsString ?? '');

      return icon.element;
    }

    return icon.element;
  }

  private loadIcon(icon: SVGIcon): Observable<SVGElement> {
    if (icon.elementAsString) {
      return of(this.prepareCachedIcon(icon.elementAsString));
    }

    return this.fetchIcon(icon).pipe(
      tap((elementAsString) => (icon.elementAsString = elementAsString ?? '')),
      map(() => this.transformStringToSVGElement(icon)),
    );
  }
}
