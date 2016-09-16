import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-left-menu',
  templateUrl: './mobile-left-menu.component.html',
  styleUrls: ['./mobile-left-menu.component.scss']
})
export class MobileLeftMenuComponent implements OnInit {


  show_mobile_menu = false;

  constructor() { }

  ngOnInit() {
  }



  @Input()
  set mobile_menu_oepn(mobile_menu_oepn: boolean) {
    this.show_mobile_menu = mobile_menu_oepn;

  }



}
