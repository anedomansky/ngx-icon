import { SafeResourceUrl } from '@angular/platform-browser';

export class SVGIcon {
  private _element: SVGElement | null = null;

  private _path: SafeResourceUrl;

  constructor(path: SafeResourceUrl) {
    this._path = path;
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
}
