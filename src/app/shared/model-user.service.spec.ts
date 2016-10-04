/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelUserService } from './model-user.service';

describe('Service: ModelUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelUserService]
    });
  });

  it('should ...', inject([ModelUserService], (service: ModelUserService) => {
    expect(service).toBeTruthy();
  }));
});
