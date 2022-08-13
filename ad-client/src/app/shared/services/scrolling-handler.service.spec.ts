import { TestBed } from '@angular/core/testing';

import { ScrollingHandlerService } from './scrolling-handler.service';

describe('ScrollingHandlerService', () => {
  let service: ScrollingHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollingHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
