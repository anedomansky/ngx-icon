import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-icon-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  set name(name: string) {
    if (name && name !== this._name) {
      this.createSVG(name);
    }

    this._name = name;
  }

  private _name?: string;

  private createSVG(name: string): void {}
}
