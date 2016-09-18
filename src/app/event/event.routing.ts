import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EventlistLayoutComponent} from './eventlist-layout/eventlist-layout.component';


const EventRoutes: Routes = [  {
    path: 'eventlist',
    component: EventlistLayoutComponent
  },
];

export const EventRouting: ModuleWithProviders 
              = RouterModule.forChild(EventRoutes);
