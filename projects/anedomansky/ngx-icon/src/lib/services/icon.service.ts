import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  /**
   * Adds a new icon to the service's map.
   * The service automatically adds the `.svg`-suffix.
   *
   * @param name The icon's name
   * @param path The asset path
   * @example `this.iconService.addIcon('camera', ''assets/')
   */
  addIcon(name: string, path: string): void {
    this.icons.set(
      name,
      new SVGIcon(
        this.sanitizer.bypassSecurityTrustResourceUrl(`${path}${name}.svg`),
        null,
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
   * Fetches the file contents of the specified icon.
   *
   * @param icon The `SVGIcon`
   * @returns The file contents wrapped in an `Observable`
   * @throws
   */
  private fetchIcon(icon: SVGIcon): Observable<string> {
    const { path } = icon;

    const safePath = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      path,
    );

    return this.httpClient.get(safePath!, { responseType: 'text' });
  }

  /**
   * Returns the already transformed `SVGElement` or creates the `SVGElement` from the previously fetched `string`.
   * @param icon The `SVGIcon`
   * @returns The `SVGElement`
   */
  private transformStringToSVGElement(icon: SVGIcon): SVGElement {
    icon.element = this.createSVGFromString(icon.elementAsString!);

    return icon.element;
  }

  /**
   * Returns the already cached icon or fetches it via the previously specified `path`.
   *
   * @param icon The `SVGIcon`
   * @returns The SVG icon wrapped in an `Observable`
   */
  private loadIcon(icon: SVGIcon): Observable<SVGElement> {
    if (icon.elementAsString) {
      return of(this.createSVGFromString(icon.elementAsString));
    }

    return this.fetchIcon(icon).pipe(
      tap((elementAsString) => (icon.elementAsString = elementAsString)),
      map(() => this.transformStringToSVGElement(icon)),
    );
  }
}
