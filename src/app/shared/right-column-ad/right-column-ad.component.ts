import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-right-column-ad',
  templateUrl: './right-column-ad.component.html',
  styleUrls: ['./right-column-ad.component.scss']
})
export class RightColumnAdComponent implements OnInit, AfterViewInit {

  constructor() {
    console.log("right column add constructor is called");
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit is called in right column ad")
  }

}
