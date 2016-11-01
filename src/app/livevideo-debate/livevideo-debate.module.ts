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
import { MotionComponent } from './common/motion/motion.component';
import { PreparationDocumentComponent } from './common/preparation_document/preparation-document/preparation-document.component';
import { DocIntroComponent } from './common/preparation_document/doc-intro/doc-intro.component';
import { DocArgContainerComponent } from './common/preparation_document/doc-arg-container/doc-arg-container.component';
import { DocArgSignpostComponent } from './common/preparation_document/doc-arg-signpost/doc-arg-signpost.component';
import { DocArgContextComponent } from './common/preparation_document/doc-arg-context/doc-arg-context.component';
import { PreparationLayoutComponent } from './preparation/preparation-layout/preparation-layout.component';
import { DebateLayoutComponent } from './debate/debate-layout/debate-layout.component';
import { ChatContainerComponent } from './common/chat/chat-container/chat-container.component';
import { ChatEachMessageComponent } from './common/chat/chat-each-message/chat-each-message.component';
import { ControllerComponent } from './debate/controller/controller.component';
import { RoleStatusComponent } from './debate/role-status/role-status.component';
import { TeamMemberComponent } from './debate/team-member/team-member.component';
import { SpeakerViewComponent } from './debate/speaker-view/speaker-view.component';
import { PoiUsersComponent } from './debate/poi-users/poi-users.component';

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
    UserVideoComponent,
    MotionComponent,
    PreparationDocumentComponent,
    DocIntroComponent,
    DocArgContainerComponent,
    DocArgSignpostComponent,
    DocArgContextComponent,
    PreparationLayoutComponent,
    DebateLayoutComponent,
    ChatContainerComponent,
    ChatEachMessageComponent,
    ControllerComponent,
    RoleStatusComponent,
    TeamMemberComponent,
    SpeakerViewComponent,
    PoiUsersComponent
  ],
  providers: [LiveDebateFirebaseService, SkywayService]
})
export class LiveVideoDebateModule {}
