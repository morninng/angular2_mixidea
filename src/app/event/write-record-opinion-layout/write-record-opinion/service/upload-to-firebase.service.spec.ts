/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventFirebaseService } from './upload-to-firebase.service';

describe('Service: UploadToFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventFirebaseService]
    });
  });

  it('should ...', inject([EventFirebaseService], (service: EventFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
