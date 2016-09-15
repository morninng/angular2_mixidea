import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  styleUrls: ['./message-header.component.scss']
})
export class MessageHeaderComponent implements OnInit {


  message_arr = ["aa"];
  is_open = false;

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
  }

  toggle_window(){
    this.is_open = !this.is_open
  }


  onClick(event){
    if (!this._eref.nativeElement.contains(event.target)){
      this.is_open = false;
    }

  }

}
