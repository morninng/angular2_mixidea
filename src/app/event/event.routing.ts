import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EventlistLayoutComponent} from './eventlist/eventlist-layout/eventlist-layout.component';
import {EventcontextLayoutOnlinedebateWrittenComponent} from './eventcontext-onlinedebate-written/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';
import {WriteRecordOpinionLayoutComponent} from './write-record-opinion/write-record-opinion-layout/write-record-opinion-layout.component';

const event_routes: Routes = [
  {
    path: 'eventlist',
    component: EventlistLayoutComponent
  },
  {
    path:'eventcontext',
    children:[
      {
        path:'onlinedebate_written/:id',
        component: EventcontextLayoutOnlinedebateWrittenComponent
      }
    ]
  },
  {
    path:'writerecord_opinion/:id',
    component:WriteRecordOpinionLayoutComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(event_routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventRoutingModule { }



