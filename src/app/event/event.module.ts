import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {EventRouting} from './event.routing';
import { EventlistLayoutComponent } from './eventlist-layout/eventlist-layout.component';
import { EventlistComponent } from './eventlist/eventlist.component'


import {SharedModule} from './../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EventRouting,
    SharedModule.forRoot()
  ],
  declarations: [
    EventlistLayoutComponent,
    EventlistComponent,
  ],
  providers: []
})
export class EventModule {}
