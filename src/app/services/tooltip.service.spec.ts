import { TestBed } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {
  let service: TooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipService]
    });
    service = TestBed.inject(TooltipService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
