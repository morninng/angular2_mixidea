import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';


import {LivevideoDebateRoutingModule} from './livevideo-debate.routing';
import { IntroductionLayoutComponent } from './introduction/introduction-layout/introduction-layout.component';
import {LivevideoDebateContainerComponent} from './livevideo-debate-container.component';
import { SelectTeamComponent } from './introduction/select-team/select-team.component';
import { ChangeStyleComponent } from './introduction/change-style/change-style.component';
import { SelectDebaterComponent } from './introduction/select-debater/select-debater.component';
import {LiveDebateFirebaseService} from './service/live-debate-firebase.service';
import { EnvironmentCheckComponent } from './environment-check/environment-check.component';
import { LivevideoDebateRootComponent } from './livevideo-debate-root.component';

import {SkywayService} from './service/skyway.service';
import { UserVideoComponent } from './common/user-video/user-video.component';

@NgModule({
  imports: [
    CommonModule,
    LivevideoDebateRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    IntroductionLayoutComponent,
    LivevideoDebateContainerComponent,
    SelectTeamComponent,
    ChangeStyleComponent,
    SelectDebaterComponent,
    EnvironmentCheckComponent,
    LivevideoDebateRootComponent,
    UserVideoComponent
  ],
  providers: [LiveDebateFirebaseService, SkywayService]
})
export class LiveVideoDebateModule {}
