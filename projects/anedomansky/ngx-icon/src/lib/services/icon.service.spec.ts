import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IconService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return SVG', () => {
    service.addIcon('test', 'assets/');
    service.getIcon('test').subscribe((svg) => expect(svg).toBe('<svg></svg>'));

    const req = httpTestingController.expectOne('assets/test.svg');
    expect(req.request.method).toEqual('GET');

    req.flush('<svg></svg>');

    service.getIcon('test').subscribe((svg) => expect(svg).toBe('<svg></svg>'));
    httpTestingController.expectNone('assets/test.svg');
  });

  it('should throw error if non existent SVG is retrieved', (done) => {
    service.addIcon('test', 'assets/');
    service.getIcon('notExisting').subscribe({ error: (err) => {
      expect(err.message).toBe('Unable to find icon with the name "notExisting"');
      done();
    }});

    httpTestingController.expectNone('assets/notExisting.svg');
  });

  it('should throw error if SVG file does not contain a <svg> element', (done) => {
    service.addIcon('test', 'assets/');
    service.getIcon('test').subscribe({ error: (err) => {
      expect(err.message).toBe('<svg> not found');
      done();
    }});

    const req = httpTestingController.expectOne('assets/test.svg');
    expect(req.request.method).toEqual('GET');

    req.flush('<div></div>');
  });
});
