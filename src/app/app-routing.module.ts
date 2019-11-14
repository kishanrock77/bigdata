import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
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
import { ActivateComponent } from './activate.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'logout', component: LoginComponent },
	{ path: 'activate', component: ActivateComponent },
	{ path: 'home', component: HomeComponent }, { path: 'contact-us', component: ContactComponent },
	{ path: 'forgetpassword', component: ForgetpwdComponent },
	{
		path: 'profile',
		component: ProfileComponent,
		children: [
			{
				// Index route for categories
				path: '',
				component: DashboardComponent
			}, {
				path: 'planhistory',
				component: YourplanhistoryComponent
			}, {
				path: 'linkhistory',
				component: YourlinkgeneratehistoryComponent
			},
			{
				path: 'emailhistory',
				component: YouremailhistoryComponent
			},
			{
				path: 'upgradeplan',
				component: UpgradeplanComponent
			},
			{
				path: 'renewplan',
				component: RenewplanComponent
			}
		]
	},
	{ path: '**', component: HomeComponent }

];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
