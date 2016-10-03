import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit {

  @Input() opinion_id :string;
  @Input() opinion :string;
  @Input() subsequent_id :string;
  @Input() opinion_status : string;

  constructor() { }



  ngOnInit() {
    
  }

}
