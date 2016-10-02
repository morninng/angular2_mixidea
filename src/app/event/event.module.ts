import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {EventRouting} from './event.routing';
import { EventlistLayoutComponent } from './eventlist/eventlist-layout/eventlist-layout.component';
import { EventlistComponent } from './eventlist/eventlist/eventlist.component'


import {SharedModule} from './../shared/shared.module';
import { EventcreateModalComponent } from './eventcreate-modal/eventcreate-modal.component';


import { ModalModule,DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { EachlistOnlineDebateLivevideoComponent } from './eventlist/eachlist-online-debate-livevideo/eachlist-online-debate-livevideo.component';
import { EachlistOnlineDebateWrittenComponent } from './eventlist/eachlist-online-debate-written/eachlist-online-debate-written.component';
import { EachlistOnlineTournamentLivevideoComponent } from './eventlist/eachlist-online-tournament-livevideo/eachlist-online-tournament-livevideo.component';
import { EachlistOnlineTournamentWrittenComponent } from './eventlist/eachlist-online-tournament-written/eachlist-online-tournament-written.component';
import { EventcontextLayoutOnlinedebateLivevideoComponent } from './event_context/eventcontext-layout-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo.component';
import { EventcontextLayoutOnlinedebateWrittenComponent } from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';
import { EventcontextOnlinedebateWrittenComponent } from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-onlinedebate-written/eventcontext-onlinedebate-written.component';
import { WriteRecordOpinionLayoutComponent } from './write-record-opinion/write-record-opinion-layout/write-record-opinion-layout.component';
import { WriteRecordOpinionComponent } from './write-record-opinion/write-record-opinion/write-record-opinion.component';
import { PlayerTranscriptionComponent } from './write-record-opinion/player-transcription/player-transcription.component';
import { RecordTranscriptComponent } from './write-record-opinion/record-transcript/record-transcript.component';
import { UploadFileComponent } from './write-record-opinion/upload-file/upload-file.component';


import {RecordWavService} from './event-service/record-wav.service';
import {SpeechRecognitionService} from './event-service/speech-recognition.service';
import {EncodeToMp3Service} from './event-service/encode-to-mp3.service';
import {EventFirebaseService} from './event-service/event-firebase.service';
import { WriteOpinionComponent } from './write-record-opinion/write-opinion/write-opinion.component';
import { ClearRecordTranscriptionComponent } from './write-record-opinion/clear-record-transcription/clear-record-transcription.component'


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
    EventcontextOnlinedebateWrittenComponent,
    WriteRecordOpinionLayoutComponent,
    WriteRecordOpinionComponent,
    PlayerTranscriptionComponent,
    RecordTranscriptComponent,
    UploadFileComponent,
    WriteOpinionComponent,
    ClearRecordTranscriptionComponent,
  ],
  providers: [RecordWavService,SpeechRecognitionService,EncodeToMp3Service,EventFirebaseService ]
})
export class EventModule {}
