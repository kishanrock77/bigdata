 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ProfileComponent } from './profile.component';
import { YourplanhistoryComponent } from './yourplanhistory.component';
import { YouremailhistoryComponent } from './youremailhistory.component';
import { YourlinkgeneratehistoryComponent } from './yourlinkgeneratehistory.component';
import { RenewplanComponent } from './renewplan.component';
import { UpgradeplanComponent } from './upgradeplan.component';
import { TicketComponent } from './ticket.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { ForgetpwdComponent } from './forgetpwd.component';
import { ContactComponent } from './contact.component';
import { CommonServiceService }     from './common-service.service';
import { ActivateComponent } from './activate.component';
import { TokenInterceptorService }     from './token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    YourplanhistoryComponent,
    YouremailhistoryComponent,
    YourlinkgeneratehistoryComponent,
    RenewplanComponent,
    UpgradeplanComponent,
    TicketComponent,
    HomeComponent,
    DashboardComponent,
    ForgetpwdComponent,
    ContactComponent,
    ActivateComponent
  ],
  imports: [BrowserModule,FileUploadModule,HttpClientModule,AppRoutingModule],
  providers: [CommonServiceService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
