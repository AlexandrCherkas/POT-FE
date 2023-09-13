import { TestBed } from '@angular/core/testing';

import { ConsumerServiceService } from './consumer-service.service';

describe('ConsumerServiceService', () => {
  let service: ConsumerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
