import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NgxIconConfigToken } from '../config/ngx-icon-config';
import { SampleService } from '../core/services/sample/sample.service';

@Component({
  selector: 'ngx-icon-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class SampleComponent {
  private sampleService = inject(SampleService);

  protected config = inject(NgxIconConfigToken);

  greeting$ = this.sampleService.sayHello();
}
