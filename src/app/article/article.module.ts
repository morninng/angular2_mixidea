import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';

import {ArticleRouting} from './article.routing';
import {ArticlelistLayoutComponent} from './articlelist-layout/articlelist-layout.component';
import { ArticlelistComponent } from './articlelist-layout/articlelist/articlelist.component';
import { WrittendebateArticleLayoutComponent } from './writtendebate-article-layout/writtendebate-article-layout.component';
import { WrittendebateArticleComponent } from './writtendebate-article-layout/writtendebate-article/writtendebate-article.component';


@NgModule({
  imports: [
    CommonModule,
    ArticleRouting,
    FormsModule,
    SharedModule.forRoot()
  ],
  declarations: [
      ArticlelistLayoutComponent,
      ArticlelistComponent,
      WrittendebateArticleLayoutComponent,
      WrittendebateArticleComponent
  ],
  providers: []
})
export class ArticleModule {}
