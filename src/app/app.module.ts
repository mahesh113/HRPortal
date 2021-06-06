import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EmpReviewComponent } from './emp-review/emp-review.component';
import { UsersComponent } from './users/users.component';
import { Constants } from './shared/Constants';
import { LogoutComponent } from './logout/logout.component';
import { LoginService } from './shared/LoginService';

const appRoutes: Routes = [
    { path: '', component : LoginFormComponent, pathMatch: 'full' },
    { path: 'login', component : LoginFormComponent },
    { path: 'reviews', component : EmpReviewComponent },
    { path: 'users/:id', component : UsersComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    EmpReviewComponent,
    UsersComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    HttpClientModule
  ],
  providers: [Constants, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
