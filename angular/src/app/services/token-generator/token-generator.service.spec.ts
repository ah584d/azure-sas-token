import { TestBed } from '@angular/core/testing';

import { TokenGeneratorService } from './token-generator.service';

describe('TokenGeneratorService', () => {
  let service: TokenGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
