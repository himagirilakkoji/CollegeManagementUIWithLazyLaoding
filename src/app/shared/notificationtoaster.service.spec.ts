import { TestBed } from '@angular/core/testing';

import { NotificationtoasterService } from './notificationtoaster.service';

describe('NotificationtoasterService', () => {
  let service: NotificationtoasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationtoasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
