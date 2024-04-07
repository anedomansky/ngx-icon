import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxIconComponent } from './icon.component';
import { NgxIconService } from './icon.service';

describe('IconComponent', () => {
  let component: NgxIconComponent;
  let fixture: ComponentFixture<NgxIconComponent>;
  let iconService: NgxIconService;
  let element: HTMLElement;
  const iconServiceStub: Partial<NgxIconService> = {
    addIcon: () => {},
    getIcon: () => {
      const div = document.createElement('div');
      div.innerHTML = '<svg></svg>';
      const svg = div.getElementsByTagName('svg')[0];
      return of(svg);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxIconComponent, HttpClientTestingModule],
      providers: [
        {
          provide: NgxIconService,
          useValue: iconServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(NgxIconComponent);
    iconService = TestBed.inject(NgxIconService);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display svg', () => {
    iconService.addIcon('test', 'assets/');
    component.name = 'test';
    fixture.detectChanges();

    const svgElement = element.getElementsByTagName('svg')[0];

    expect(svgElement).toBeTruthy();
  });

  it('should update svg', () => {
    iconService.addIcon('test', 'assets/');
    component.name = 'test';
    fixture.detectChanges();

    const svgElement = element.getElementsByTagName('svg')[0];

    expect(svgElement).toBeTruthy();

    component.name = 'test2';
    fixture.detectChanges();

    expect(element.getElementsByTagName('svg').length).toBe(1);
  });
});
