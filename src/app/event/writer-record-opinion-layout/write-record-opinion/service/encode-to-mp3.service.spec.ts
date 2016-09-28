/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncodeToMp3Service } from './encode-to-mp3.service';

describe('Service: EncodeToMp3', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncodeToMp3Service]
    });
  });

  it('should ...', inject([EncodeToMp3Service], (service: EncodeToMp3Service) => {
    expect(service).toBeTruthy();
  }));
});
