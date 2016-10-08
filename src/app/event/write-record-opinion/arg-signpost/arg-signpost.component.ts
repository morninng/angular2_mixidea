import { Component, OnInit,Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-arg-signpost',
  templateUrl: './arg-signpost.component.html',
  styleUrls: ['./arg-signpost.component.scss']
})
export class ArgSignpostComponent implements OnInit, OnChanges {

  @Input() type:string

  input_signpost = false;
  show_signpost = false;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.type == "main"){
      this.input_signpost = true;
      this.show_signpost = false;
    }else{
      this.show_signpost = true;
      this.input_signpost = false;
    }
  }

  set_signpost(signpost){
    console.log(signpost);
  }


}
