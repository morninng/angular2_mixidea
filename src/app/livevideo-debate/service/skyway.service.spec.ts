/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SkywayService } from './skyway.service';

describe('Service: Skyway', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkywayService]
    });
  });

  it('should ...', inject([SkywayService], (service: SkywayService) => {
    expect(service).toBeTruthy();
  }));
});
