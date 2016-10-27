/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiveDebateFirebaseService } from './live-debate-firebase.service';

describe('Service: LiveDebateFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveDebateFirebaseService]
    });
  });

  it('should ...', inject([LiveDebateFirebaseService], (service: LiveDebateFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
