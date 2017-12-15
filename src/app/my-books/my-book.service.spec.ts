import { TestBed, inject } from '@angular/core/testing';

import { MyBookService } from './my-book.service';

describe('MyBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyBookService]
    });
  });

  it('should be created', inject([MyBookService], (service: MyBookService) => {
    expect(service).toBeTruthy();
  }));
});
