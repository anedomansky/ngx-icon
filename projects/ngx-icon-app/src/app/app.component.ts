import { NgxIconComponent } from '@anedomansky/ngx-icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgxIconComponent],
})
export class AppComponent {}
