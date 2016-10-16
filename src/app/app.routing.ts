import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {TestComponent} from './test/test.component'

export const app_routes: Routes = [
  /*
  {
    path: 'artice',
    loadChildren: 'app/article/artice.module#ArticleModule'
  },
  {
    path: 'event',
    loadChildren: 'app/event/event.module#EventModule'
  },
    */
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: '**',
    redirectTo: '/articlelist',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(app_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
