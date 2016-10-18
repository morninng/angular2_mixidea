/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedFirebaseService } from './shared-firebase.service';

describe('Service: SharedFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedFirebaseService]
    });
  });

  it('should ...', inject([SharedFirebaseService], (service: SharedFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
