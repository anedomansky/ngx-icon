import { SafeResourceUrl } from '@angular/platform-browser';

export class SVGIcon {
  private _element: SVGElement | null = null;

  private _path: SafeResourceUrl;

  private _elementAsString: string | null;

  constructor(path: SafeResourceUrl, elementAsString: string | null) {
    this._path = path;
    this._elementAsString = elementAsString;
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

  set elementAsString(elementAsString: string | null) {
    this._elementAsString = elementAsString;
  }

  get elementAsString(): string | null {
    return this._elementAsString;
  }
}
