/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadToFirebaseService } from './upload-to-firebase.service';

describe('Service: UploadToFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadToFirebaseService]
    });
  });

  it('should ...', inject([UploadToFirebaseService], (service: UploadToFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
