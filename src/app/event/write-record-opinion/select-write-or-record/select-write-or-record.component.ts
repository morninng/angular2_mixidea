import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-write-or-record',
  templateUrl: './select-write-or-record.component.html',
  styleUrls: ['./select-write-or-record.component.scss']
})
export class SelectWriteOrRecordComponent implements OnInit {

  @Output() onSelectRecording = new EventEmitter();
  @Output() onSelectWriting = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  select_recording(){
    this.onSelectRecording.emit();
  }

  select_writing(){
    this.onSelectWriting.emit();

  }

}
