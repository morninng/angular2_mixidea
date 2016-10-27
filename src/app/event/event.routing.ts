import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {EventContainerComponent} from './event-container.component';
import {EventlistLayoutComponent} from './eventlist/eventlist-layout/eventlist-layout.component';
import {EventcontextLayoutOnlinedebateWrittenComponent} from './eventcontext-onlinedebate-written/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';
import {WriteRecordOpinionLayoutComponent} from './write-record-opinion/write-record-opinion-layout/write-record-opinion-layout.component';
import {EventcontextLayoutOnlinedebateLivevideoComponent} from './eventcontext-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo/eventcontext-layout-onlinedebate-livevideo.component'


@NgModule({
  imports: [
    RouterModule.forChild(

[
  {
    path: 'event',
    component: EventContainerComponent,
    children: [
      {
        path: 'eventlist',
        component: EventlistLayoutComponent
      },
      {
        path: 'eventcontext',
        children:[
          {
            path:'onlinedebate_written/:id',
            component: EventcontextLayoutOnlinedebateWrittenComponent
          },
          {
            path:'onlinedebate_livevideo/:id',
            component: EventcontextLayoutOnlinedebateLivevideoComponent
          },          
          {
            path:'writerecord_opinion/:id',
            component:WriteRecordOpinionLayoutComponent
          }
        ]
      }
    ]
  }
]


    )
  ],
  exports: [
    RouterModule
  ]
})
export class EventRoutingModule { }



