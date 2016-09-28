import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EventlistLayoutComponent} from './eventlist-layout/eventlist-layout.component';

import {EventcontextLayoutOnlinedebateWrittenComponent} from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';
import {WriterRecordOpinionLayoutComponent} from './writer-record-arg-layout/writer-record-arg-layout.component';

const EventRoutes: Routes = [
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
    component:WriterRecordOpinionLayoutComponent
  }
];


export const EventRouting: ModuleWithProviders 
              = RouterModule.forChild(EventRoutes);
