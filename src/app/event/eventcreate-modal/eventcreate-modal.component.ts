import { Component, OnInit , ViewChild, Input} from '@angular/core';

import { ModalDirective } from './../../../../node_modules/ng2-bootstrap/components/modal/modal.component';
import {DatepickerModule} from './../../../../node_modules/ng2-bootstrap/components/datepicker';
import {TimepickerModule} from './../../../../node_modules/ng2-bootstrap/components/timepicker';
import {Event} from './../event'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-eventcreate-modal',
  templateUrl: './eventcreate-modal.component.html',
  styleUrls: ['./eventcreate-modal.component.scss']
})
export class EventcreateModalComponent implements OnInit {

  submitted = false;
  event_obj = new Event();

  constructor() { }

  @ViewChild(ModalDirective) event_create_modal:ModalDirective;

  ngOnInit() {
  }

  open_modal(){
    console.log("open modal");
    this.event_create_modal.show();
  }

  onSubmit(){
    this.submitted = true;
    this.event_obj.compute_date_time()
  }

  close_modal(){
    this.event_create_modal.hide();
  }

  fix_data(){
    this.submitted = false;
  }

  save_data(){
  }

  finsh_event_creation(){    
  }


}
