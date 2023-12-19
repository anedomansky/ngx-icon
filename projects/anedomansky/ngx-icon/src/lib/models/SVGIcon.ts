import { SafeResourceUrl } from '@angular/platform-browser';

export class SVGIcon {
  private _element: SVGElement | null = null;

  private _path: SafeResourceUrl;

  private _elementAsText: string | null;

  constructor(path: SafeResourceUrl, elementAsText: string | null) {
    this._path = path;
    this._elementAsText = elementAsText;
  }

  set element(element: SVGElement | null) {
    this._element = element;
  }

  get element(): SVGElement | null {
    return this._element;
  }

  set path(path: SafeResourceUrl) {
    this._path = path;
  }

  get path(): SafeResourceUrl {
    return this._path;
  }

  set elementAsText(elementAsText: string | null) {
    this._elementAsText = elementAsText;
  }

  get elementAsText(): string | null {
    return this._elementAsText;
  }
}
