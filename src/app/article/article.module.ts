import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';

import {ArticleRouting} from './article.routing';
import {ArticlelistLayoutComponent} from './articlelist-layout/articlelist-layout.component';
import { ArticlelistComponent } from './articlelist-layout/articlelist/articlelist.component';
import { WrittendebateLayoutComponent } from './writtendebate-layout/writtendebate-layout.component';
import { WrittenDebateComponent } from './writtendebate-layout/written-debate/written-debate.component';


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
      WrittendebateLayoutComponent,
      WrittenDebateComponent
  ],
  providers: []
})
export class ArticleModule {}
