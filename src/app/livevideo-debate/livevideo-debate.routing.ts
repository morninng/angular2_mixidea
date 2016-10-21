import { NgModule }  from '@angular/core';
import { RouterModule } from '@angular/router';

import {LivevideoDebateContainerComponent} from './livevideo-debate-container.component';
import { IntroductionLayoutComponent } from './introduction/introduction-layout/introduction-layout.component';




@NgModule({
  imports: [
    RouterModule.forChild(
    [
      {
        path: 'livevideo-debate/:id',
        component: LivevideoDebateContainerComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class LivevideoDebateRoutingModule { }



