import { Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.scss'],
  host: {'(document:click)': 'onClick($event)'}
})
export class NotificationHeaderComponent implements OnInit {

  notification_arr = ["aa"];
  is_open = false;

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
  }

  toggle_window(){
    this.is_open = !this.is_open
  }

// http://stackoverflow.com/questions/35712379/angular2-close-dropdown-on-click-outside-is-there-an-easiest-way
// http://blog.yuhiisk.com/archive/2016/05/01/angular2-dom-manupilation.html


  onClick(event){
    if (!this._eref.nativeElement.contains(event.target)){
      this.is_open = false;
    }
  }


}
