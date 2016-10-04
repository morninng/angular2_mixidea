import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ArticlelistLayoutComponent} from './article/articlelist/articlelist-layout/articlelist-layout.component';

import {TestComponent} from './test/test.component'

const appRoutes: Routes = [

  {
    path: 'articlelist',
    component: ArticlelistLayoutComponent
  },{
    path: 'test',
    component: TestComponent
  },
  {
    path: '',
    component: ArticlelistLayoutComponent
  },
  {
    path: '**',
    component: ArticlelistLayoutComponent
  }
];



export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);