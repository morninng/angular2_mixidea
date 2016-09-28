import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticlelistLayoutComponent} from './articlelist-layout/articlelist-layout.component';
import {WrittendebateArticleLayoutComponent} from './writtendebate-article-layout/writtendebate-article-layout.component';

const ArticleRoutes: Routes = [
  {
    path: 'articlelist',
    component: ArticlelistLayoutComponent
  },
  {
    path: 'written_debate_article/:id',
    component: WrittendebateArticleLayoutComponent

  }
];


export const ArticleRouting: ModuleWithProviders 
              = RouterModule.forChild(ArticleRoutes);
