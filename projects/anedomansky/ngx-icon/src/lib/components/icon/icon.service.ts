import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, shareReplay, throwError } from 'rxjs';

import { SVGIcon } from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class NgxIconService {
  private readonly httpClient = inject(HttpClient);

  private readonly document = inject(DOCUMENT);

  private readonly sanitizer = inject(DomSanitizer);

  private icons = new Map<string, SVGIcon>();

  private cache = new Map<string, Observable<SVGElement>>();

  /**
   * Registers an icon by URL.
   *
   * @param name name for the icon
   * @param path path to the svg-file
   * @example `this.iconService.addIcon('camera', ''assets/')
   */
  addIcon(name: string, path: string): void {
    this.icons.set(
      name,
      new SVGIcon(
        this.sanitizer.bypassSecurityTrustResourceUrl(`${path}${name}.svg`),
      ),
    );
  }

  /**
   * The specified SVG icon has to be added via `addIcon()` before accessing it with this function.
   * Otherwise it throws an error.
   *
   * @param name The icon's name
   * @returns The specified SVG icon wrapped in an `Observable`
   * @throws
   */
  getIcon(name: string): Observable<SVGElement> {
    const icon = this.icons.get(name);

    if (icon) {
      return this.loadIcon(icon);
    }

    return throwError(
      () => new Error(`Unable to find icon with the name "${name}"`),
    );
  }

  /**
   * Creates a `SVGElement` from the supplied `string`.
   *
   * @param iconAsString The SVG icon as text
   * @returns The `SVGElement`
   */
  private createSVGFromString(iconAsString: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = iconAsString;
    const svg = div.getElementsByTagName('svg')[0];

    if (!svg) {
      throw new Error('<svg> not found');
    }

    return svg;
  }

  /**
   * Returns the already cached icon or fetches it via the previously specified `path`.
   *
   * @param icon The `SVGIcon`
   * @returns The SVG icon wrapped in an `Observable`
   */
  private loadIcon(icon: SVGIcon): Observable<SVGElement> {
    const { path } = icon;

    const safePath = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      path,
    );

    if (safePath && !this.cache.has(safePath)) {
      this.cache.set(
        safePath,
        this.httpClient.get(safePath, { responseType: 'text' }).pipe(
          shareReplay(1),
          map((iconAsString) => this.createSVGFromString(iconAsString)),
        ),
      );
    }

    return (
      this.cache.get(safePath!) ??
      throwError(() => new Error(`The path "${path}" is not cached.`))
    );
  }
}
