import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { EventlistLayoutComponent } from './eventlist-layout/eventlist-layout.component';
import { VerticalEventchoiceComponent } from './vertical-eventchoice/vertical-eventchoice.component';
import { HorizontalEventtypePcComponent } from './horizontal-eventtype-pc/horizontal-eventtype-pc.component';
import { HorizontalEventtypeMobileComponent } from './horizontal-eventtype-mobile/horizontal-eventtype-mobile.component';
import { AdvertisingColumnComponent } from './advertising-column/advertising-column.component';

import {EventRouting} from './event.routing'

@NgModule({
  imports: [
    CommonModule,
    EventRouting
  ],
  declarations: [
    EventlistLayoutComponent,
    VerticalEventchoiceComponent,
    HorizontalEventtypePcComponent,
    HorizontalEventtypeMobileComponent,
    AdvertisingColumnComponent,
  ],
  providers: []
})
export class EventModule {}
