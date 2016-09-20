import { Component, OnInit , ViewChild, Input} from '@angular/core';

import { ModalDirective } from './../../../../node_modules/ng2-bootstrap/components/modal/modal.component';

@Component({
  selector: 'app-eventcreate-modal',
  templateUrl: './eventcreate-modal.component.html',
  styleUrls: ['./eventcreate-modal.component.scss']
})
export class EventcreateModalComponent implements OnInit {

  constructor() { }


  @ViewChild(ModalDirective) event_create_modal:ModalDirective;


  ngOnInit() {
  }

  open_modal(){
    console.log("open modal");
    this.event_create_modal.show();
  }




}
