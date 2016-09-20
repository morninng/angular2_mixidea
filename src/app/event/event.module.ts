import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {EventRouting} from './event.routing';
import { EventlistLayoutComponent } from './eventlist-layout/eventlist-layout.component';
import { EventlistComponent } from './eventlist/eventlist.component'


import {SharedModule} from './../shared/shared.module';
import { EventcreateModalComponent } from './eventcreate-modal/eventcreate-modal.component';


import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    EventRouting,
    ModalModule,
    SharedModule.forRoot()
  ],
  declarations: [
    EventlistLayoutComponent,
    EventlistComponent,
    EventcreateModalComponent,
  ],
  providers: []
})
export class EventModule {}
