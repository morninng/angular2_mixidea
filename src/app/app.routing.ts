import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ArticlelistLayoutComponent} from './article/articlelist/articlelist-layout/articlelist-layout.component';


const appRoutes: Routes = [

  {
    path: 'articlelist',
    component: ArticlelistLayoutComponent
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