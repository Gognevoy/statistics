import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isVisible to true when open() is called', () => {
    service.open();
    expect(service.isVisible).toBe(true);
  });

  it('should set isVisible to false when close() is called', () => {
    service.close();
    expect(service.isVisible).toBe(false);
  });
});
