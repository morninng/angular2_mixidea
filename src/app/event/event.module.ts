import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {EventRoutingModule} from './event.routing';
import { EventlistLayoutComponent } from './eventlist/eventlist-layout/eventlist-layout.component';
import { EventlistComponent } from './eventlist/eventlist/eventlist.component'


import {SharedModule} from './../shared/shared.module';
import { EventcreateModalComponent } from './eventcreate-modal/eventcreate-modal.component';

import { ModalModule,DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { EachEventlistComponent } from './eventlist/each-eventlist/each-eventlist.component';
import { EventcontextLayoutOnlinedebateLivevideoComponent } from './eventcontext-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo.component';
import { EventcontextLayoutOnlinedebateWrittenComponent } from './eventcontext-onlinedebate-written/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';
import { EventcontextOnlinedebateWrittenComponent } from './eventcontext-onlinedebate-written/eventcontext-onlinedebate-written/eventcontext-onlinedebate-written.component';
import { WriteRecordOpinionLayoutComponent } from './write-record-opinion/write-record-opinion-layout/write-record-opinion-layout.component';
import { WriteRecordOpinionComponent } from './write-record-opinion/write-record-opinion/write-record-opinion.component';
import { PlayerTranscriptionComponent } from './write-record-opinion/player-transcription/player-transcription.component';
import { RecordTranscriptComponent } from './write-record-opinion/record-transcript/record-transcript.component';
import { UploadFileComponent } from './write-record-opinion/upload-file/upload-file.component';


import {RecordWavService} from './service/record-wav.service';
import {SpeechRecognitionService} from './service/speech-recognition.service';
import {EncodeToMp3Service} from './service/encode-to-mp3.service';
import {EventFirebaseService} from './service/event-firebase.service';
import { WriteOpinionComponent } from './write-record-opinion/write-opinion/write-opinion.component';
import { ClearRecordTranscriptionComponent } from './write-record-opinion/clear-record-transcription/clear-record-transcription.component';
import { ArgSignpostComponent } from './write-record-opinion/arg-signpost/arg-signpost.component';
import { SelectWriteOrRecordComponent } from './write-record-opinion/select-write-or-record/select-write-or-record.component';
import { RecordTranscriptContainerComponent } from './write-record-opinion/record-transcript-container/record-transcript-container.component';
import { UpdateTranscriptComponent } from './write-record-opinion/update-transcript/update-transcript.component';
import { EventContainerComponent } from './event-container.component'


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    ModalModule,
    DatepickerModule,
    TimepickerModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EventlistLayoutComponent,
    EventlistComponent,
    EventcreateModalComponent,
    EachEventlistComponent,
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
    ArgSignpostComponent,
    SelectWriteOrRecordComponent,
    RecordTranscriptContainerComponent,
    UpdateTranscriptComponent,
    EventContainerComponent,
  ],
  providers: [RecordWavService,SpeechRecognitionService,EncodeToMp3Service,EventFirebaseService ]
})
export class EventModule {}
