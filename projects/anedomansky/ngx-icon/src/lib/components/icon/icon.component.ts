import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subscription, take } from 'rxjs';

import { NgxIconService } from '../../services/icon.service';

@Component({
  selector: 'ngx-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxIconComponent implements OnDestroy {
  private readonly iconService = inject(NgxIconService);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private readonly renderer = inject(Renderer2);

  /**
   * Used in order to 'abort' pending icon fetches if the component is destroyed while fetching an icon.
   */
  private iconFetch = Subscription.EMPTY;

  @Input()
  set name(name: string) {
    if (name && name !== this._name) {
      this.createSVG(name);
    }

    this._name = name;
  }

  private _name?: string;

  ngOnDestroy(): void {
    this.iconFetch.unsubscribe();
  }

  /**
   * Removes the SVG and all other non-element nodes and replaces them with the new SVG.
   *
   * @param svg The SVGElement to be displayed
   */
  private updateSVGElement(svg: SVGElement): void {
    let existingChildrenCount = this.elementRef.nativeElement.childNodes.length;

    while (existingChildrenCount--) {
      const child =
        this.elementRef.nativeElement.childNodes[existingChildrenCount];

      // only remove non element nodes and 'svg' nodes
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        this.renderer.removeChild(this.elementRef.nativeElement, child);
      }
    }

    this.renderer.appendChild(this.elementRef.nativeElement, svg);
  }

  /**
   * Creates the icon with the specified `name`.
   *
   * @param name The icon's name
   */
  private createSVG(name: string): void {
    this.iconFetch = this.iconService
      .getIcon(name)
      .pipe(take(1))
      .subscribe((svg) => this.updateSVGElement(svg));
  }
}
