import { Component, OnInit, Input,OnDestroy,
   trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-mobile-left-menu',
  templateUrl: './mobile-left-menu.component.html',
  styleUrls: ['./mobile-left-menu.component.scss'],
  /*
  animations: [
    trigger("test_animate_state",[
      state("active", style({width:"0px", backgroundColor:"#ff0000"})),
      state("inactive",style({width:"100px", backgroundColor:"#0000ff"})),
      transition("inactive=>active", animate("500ms ease-in")),
      transition("active=>inactive", animate("500ms ease-out"))
    ])
  ]  
  */
  animations: [
    trigger("flyInOut",[
      state("in", style({transform:"translateX(0)"})),
      transition("void=>*", [style({transform: 'translateX(-200px)'}), animate(200)]),
      /*,transition("*=>void", [style({transform: 'translateX(0)'}), animate(200)])*/
      transition("*=>void", [animate(1000, style({transform: 'translateX(100%)'}))])
      
    ])
  ]
})

export class MobileLeftMenuComponent implements OnInit,OnDestroy {
  show_mobile_menu = false;
  is_open = "inactive";
  constructor() {
    console.log("mobile left menu is called");
   }
  ngOnInit() {
  }
  ngOnDestroy(){
    console.log("mobile left menu is destroyed.")
  }
}
