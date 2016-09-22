import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EventlistLayoutComponent} from './eventlist-layout/eventlist-layout.component';

import {EventcontextLayoutOnlinedebateWrittenComponent} from './event_context/eventcontext-layout-onlinedebate-written/eventcontext-layout-onlinedebate-written.component';


const EventRoutes: Routes = [  {
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
  }
];


export const EventRouting: ModuleWithProviders 
              = RouterModule.forChild(EventRoutes);
