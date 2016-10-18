import { NgModule }  from '@angular/core';
import { RouterModule } from '@angular/router';

import {ArticlelistLayoutComponent} from './articlelist/articlelist-layout/articlelist-layout.component';
import {WrittendebateLayoutComponent} from './writtendebate/writtendebate-layout/writtendebate-layout.component';
import { ArticleContainerComponent } from './article-container.component'



@NgModule({
  imports: [
    RouterModule.forChild(
    [
      {
        path: 'article',
        component: ArticleContainerComponent,
        children: [
          { path: 'articlelist', component: ArticlelistLayoutComponent},
          { path: 'written_debate_article/:id', component: WrittendebateLayoutComponent}
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class ArticleRoutingModule { }



