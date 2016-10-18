import { NgModule }             from '@angular/core';
import { RouterModule } from '@angular/router';


import {TestComponent} from './test/test.component'

// export const app_routes: Routes = 
// [
//   {
//     path: 'article',
//     loadChildren: './article/article.module#ArticleModule'
//   },
//   /*,
//   {
//     path: 'event',
//     loadChildren: 'app/event/event.module#EventModule'
//   },*/
//   {
//     path: 'test',
//     component: TestComponent
//   },
//   /*
//   {
//     path: '**',
//     redirectTo: '/articlelist',
//   }*/

// ];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      /*
      {
        path: 'article',
        loadChildren: () => require('es6-promise!./article/article.module')('ArticleModule')
      },
      */
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: '**',
        redirectTo: '/article/articlelist',
      }
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
