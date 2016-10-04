/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleFirebaseService } from './article-firebase.service';

describe('Service: ArticleFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleFirebaseService]
    });
  });

  it('should ...', inject([ArticleFirebaseService], (service: ArticleFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
