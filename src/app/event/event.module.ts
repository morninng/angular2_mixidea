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
import { EventcontextOnlinedebateWrittenComponent } from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-onlinedebate-written/eventcontext-onlinedebate-written.component';
import { WriterRecordOpinionLayoutComponent } from './writer-record-opinion-layout/writer-record-opinion-layout.component';
import { WriteRecordOpinionComponent } from './writer-record-opinion-layout/write-record-opinion/write-record-opinion.component';
import { PlayerTranscriptionComponent } from './writer-record-opinion-layout/write-record-opinion/player-transcription/player-transcription.component';
import { RecordTranscriptComponent } from './writer-record-opinion-layout/write-record-opinion/record-transcript/record-transcript.component';
import { UploadFileComponent } from './writer-record-opinion-layout/write-record-opinion/upload-file/upload-file.component';


import {RecordWavService} from './writer-record-opinion-layout/write-record-opinion/service/record-wav.service';
import {SpeechRecognitionService} from './writer-record-opinion-layout/write-record-opinion/service/speech-recognition.service';
import {EncodeToMp3Service} from './writer-record-opinion-layout/write-record-opinion/service/encode-to-mp3.service';
import {UploadToFirebaseService} from './writer-record-opinion-layout/write-record-opinion/service/upload-to-firebase.service';
import { WriteOpinionComponent } from './writer-record-opinion-layout/write-record-opinion/write-opinion/write-opinion.component';
import { ClearRecordTranscriptionComponent } from './writer-record-opinion-layout/write-record-opinion/clear-record-transcription/clear-record-transcription.component'


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
    WriterRecordOpinionLayoutComponent,
    WriteRecordOpinionComponent,
    PlayerTranscriptionComponent,
    RecordTranscriptComponent,
    UploadFileComponent,
    WriteOpinionComponent,
    ClearRecordTranscriptionComponent,
  ],
  providers: [RecordWavService,SpeechRecognitionService,EncodeToMp3Service,UploadToFirebaseService ]
})
export class EventModule {}
