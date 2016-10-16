import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ArticlelistLayoutComponent} from './articlelist/articlelist-layout/articlelist-layout.component';
import {WrittendebateLayoutComponent} from './writtendebate/writtendebate-layout/writtendebate-layout.component';


const article_routes: Routes = [
  {
    path: 'articlelist',
    component: ArticlelistLayoutComponent
  },
  {
    path: 'written_debate_article/:id',
    component: WrittendebateLayoutComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(article_routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ArticleRoutingModule { }



