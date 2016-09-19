import { Component, OnInit } from '@angular/core';
import { UserauthService} from './../../shared/userauth.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {

  constructor(private user_auth : UserauthService) { }

  ngOnInit() {
  }

}

