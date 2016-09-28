import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private viewContainerRef: ViewContainerRef;
  date = new Date();



  public constructor(viewContainerRef:ViewContainerRef){
    
    this.viewContainerRef = viewContainerRef;
    
  }

  title = 'app works!';
}
