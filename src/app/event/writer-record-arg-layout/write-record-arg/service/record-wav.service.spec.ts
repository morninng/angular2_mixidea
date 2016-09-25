/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecordWavService } from './record-wav.service';

describe('Service: RecordWav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordWavService]
    });
  });

  it('should ...', inject([RecordWavService], (service: RecordWavService) => {
    expect(service).toBeTruthy();
  }));
});
