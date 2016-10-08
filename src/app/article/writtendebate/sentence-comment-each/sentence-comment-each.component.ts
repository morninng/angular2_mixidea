import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sentence-comment-each',
  templateUrl: './sentence-comment-each.component.html',
  styleUrls: ['./sentence-comment-each.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceCommentEachComponent implements OnInit {

  @Input() each_comment_sentence;

  constructor() { }

  ngOnInit() {
  }

}
