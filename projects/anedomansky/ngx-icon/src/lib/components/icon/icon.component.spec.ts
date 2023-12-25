import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IconService } from '../../services/icon.service';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let iconService: IconService;
  let element: HTMLElement;
  const iconServiceStub: Partial<IconService> = {
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
      imports: [IconComponent, HttpClientTestingModule],
      providers: [
        {
          provide: IconService,
          useValue: iconServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(IconComponent);
    iconService = TestBed.inject(IconService);
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
