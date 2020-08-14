import { TestBed } from '@angular/core/testing';

import { ComandosService } from './comandos.service';

describe('ComandosService', () => {
  let service: ComandosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComandosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
