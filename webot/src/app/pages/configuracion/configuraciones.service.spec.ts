import { TestBed } from '@angular/core/testing';

import { ConfiguracionesService } from './configuraciones.service';

describe('ConfiguracionesService', () => {
  let service: ConfiguracionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
