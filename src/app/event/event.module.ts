import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {EventRouting} from './event.routing';
import { EventlistLayoutComponent } from './eventlist-layout/eventlist-layout.component';
import { EventlistComponent } from './eventlist-layout/eventlist/eventlist.component'


import {SharedModule} from './../shared/shared.module';
import { EventcreateModalComponent } from './eventcreate-modal/eventcreate-modal.component';


import { ModalModule,DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { EachlistOnlineDebateLivevideoComponent } from './eventlist-layout/eventlist/eachlist-online-debate-livevideo/eachlist-online-debate-livevideo.component';
import { EachlistOnlineDebateWrittenComponent } from './eventlist-layout/eventlist/eachlist-online-debate-written/eachlist-online-debate-written.component';
import { EachlistOnlineTournamentLivevideoComponent } from './eventlist-layout/eventlist/eachlist-online-tournament-livevideo/eachlist-online-tournament-livevideo.component';
import { EachlistOnlineTournamentWrittenComponent } from './eventlist-layout/eventlist/eachlist-online-tournament-written/eachlist-online-tournament-written.component';
import { EventcontextLayoutOnlinedebateLivevideoComponent } from './event_context/eventcontext-layout-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo.component';
import { EventcontextLayoutOnlinedebateWrittenComponent } from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';


@NgModule({
  imports: [
    CommonModule,
    EventRouting,
    ModalModule,
    DatepickerModule,
    TimepickerModule,
    FormsModule,
    SharedModule.forRoot()
  ],
  declarations: [
    EventlistLayoutComponent,
    EventlistComponent,
    EventcreateModalComponent,
    EachlistOnlineDebateLivevideoComponent,
    EachlistOnlineDebateWrittenComponent,
    EachlistOnlineTournamentLivevideoComponent,
    EachlistOnlineTournamentWrittenComponent,
    EventcontextLayoutOnlinedebateLivevideoComponent,
    EventcontextLayoutOnlinedebateWrittenComponent,
  ],
  providers: []
})
export class EventModule {}
