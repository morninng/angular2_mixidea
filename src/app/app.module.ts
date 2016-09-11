import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserauthService} from './shared/userauth.service';
import { NotificationHeaderComponent } from './header/notification-header/notification-header.component';
import { MessageHeaderComponent } from './header/message-header/message-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
