import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';

import {ArticleRouting} from './article.routing';
import {ArticlelistLayoutComponent} from './articlelist/articlelist-layout/articlelist-layout.component';
import { ArticlelistComponent } from './articlelist/articlelist/articlelist.component';
import { WrittendebateLayoutComponent } from './writtendebate/writtendebate-layout/writtendebate-layout.component';
import { WrittenDebateComponent } from './writtendebate/written-debate/written-debate.component';
import { ArgumentComponent } from './writtendebate/argument/argument.component';
import { OpinionComponent } from './writtendebate/opinion/opinion.component';


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
      WrittenDebateComponent,
      ArgumentComponent,
      OpinionComponent
  ],
  providers: []
})
export class ArticleModule {}
