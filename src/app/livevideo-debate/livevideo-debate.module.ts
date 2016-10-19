import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';


import {LivevideoDebateRoutingModule} from './livevideo-debate.routing';
import { IntroductionLayoutComponent } from './introduction/introduction-layout/introduction-layout.component';
import {LivevideoDebateContainerComponent} from './livevideo-debate-container.component';


@NgModule({
  imports: [
    CommonModule,
    LivevideoDebateRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    IntroductionLayoutComponent,
    LivevideoDebateContainerComponent
  ],
  providers: []
})
export class LiveVideoDebateModule {}
