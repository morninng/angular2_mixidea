import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import {SharedModule} from './../shared/shared.module';

import {ArticleRoutingModule} from './article.routing';
import {ArticlelistLayoutComponent} from './articlelist/articlelist-layout/articlelist-layout.component';
import { ArticlelistComponent } from './articlelist/articlelist/articlelist.component';
import { WrittendebateLayoutComponent } from './writtendebate/writtendebate-layout/writtendebate-layout.component';
import { WrittenDebateComponent } from './writtendebate/written-debate/written-debate.component';
import { ArgumentComponent } from './writtendebate/argument/argument.component';
import { OpinionComponent } from './writtendebate/opinion/opinion.component';
import { WrittenComponent } from './writtendebate/written/written.component';
import { TranscriptionComponent } from './writtendebate/transcription/transcription.component';
import { SentenceWrittenComponent } from './writtendebate/sentence-written/sentence-written.component';
import { SentenceTranscriptionComponent } from './writtendebate/sentence-transcription/sentence-transcription.component';
import {CommentService} from './service/comment.service';
import { SentenceCommentContainerComponent } from './writtendebate/sentence-comment-container/sentence-comment-container.component'

import {ArticleFirebaseService} from './service/article-firebase.service';
import { SentenceCommentEachComponent } from './writtendebate/sentence-comment-each/sentence-comment-each.component';
import { GeneralCommentComponent } from './writtendebate/general-comment/general-comment.component';
import { TeamMemberComponent } from './writtendebate/team-member/team-member.component';
import { VoteComponent } from './writtendebate/vote/vote.component';
import { ArticleContainerComponent } from './article-container.component'

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
      ArticlelistLayoutComponent,
      ArticlelistComponent,
      WrittendebateLayoutComponent,
      WrittenDebateComponent,
      ArgumentComponent,
      OpinionComponent,
      WrittenComponent,
      TranscriptionComponent,
      SentenceWrittenComponent,
      SentenceTranscriptionComponent,
      SentenceCommentContainerComponent,
      SentenceCommentEachComponent,
      GeneralCommentComponent,
      TeamMemberComponent,
      VoteComponent,
      ArticleContainerComponent
  ],
  providers: [CommentService, ArticleFirebaseService]
})
export class ArticleModule {}
