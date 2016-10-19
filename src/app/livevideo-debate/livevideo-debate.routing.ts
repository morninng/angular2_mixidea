import { NgModule }  from '@angular/core';
import { RouterModule } from '@angular/router';

import {LivevideoDebateContainerComponent} from './livevideo-debate-container.component';
import { IntroductionLayoutComponent } from './introduction/introduction-layout/introduction-layout.component';




@NgModule({
  imports: [
    RouterModule.forChild(
    [
      {
        path: 'livevideo-debate',
        component: LivevideoDebateContainerComponent,
        children: [
          { path: 'introduction', component: IntroductionLayoutComponent}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class LivevideoDebateRoutingModule { }



