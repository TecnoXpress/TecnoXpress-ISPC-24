import { TestBed } from '@angular/core/testing';

import { RecomendacionesServiceService } from './recomendaciones-service.service';

describe('RecomendacionesServiceService', () => {
  let service: RecomendacionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendacionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
