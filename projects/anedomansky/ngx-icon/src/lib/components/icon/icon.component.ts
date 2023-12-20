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

import { IconService } from '../../services/icon.service';

@Component({
  selector: 'ngx-icon-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnDestroy {
  private readonly iconService = inject(IconService);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private readonly renderer = inject(Renderer2);

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

  private updateSVGElement(svg: SVGElement): void {
    let existingChildrenCount = this.elementRef.nativeElement.childNodes.length;

    while (existingChildrenCount--) {
      const child =
        this.elementRef.nativeElement.childNodes[existingChildrenCount];

      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        this.renderer.removeChild(this.elementRef.nativeElement, child);
      }
    }

    this.renderer.appendChild(this.elementRef.nativeElement, svg);
  }

  private createSVG(name: string): void {
    this.iconFetch = this.iconService
      .getIcon(name)
      .pipe(take(1))
      .subscribe((svg) => this.updateSVGElement(svg));
  }
}
