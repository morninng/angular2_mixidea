import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.scss']
})
export class ArticlelistComponent implements OnInit {

  article_list : FirebaseListObservable<any>

  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.article_list = this.af.database.list("event_related/article/")
  }

  goto_article(item){
    console.log(item);
    const event_id = item.$key
    const type = item.type;
    /* retrieving the participants information can be triggered here */
    console.log("goto_article");

    this.router.navigate(['/written_debate_article', event_id]);

  }


}
