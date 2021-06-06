import { Route } from '@angular/compiler/src/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/LoginService';
import { PortalService } from './shared/portal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  loggedIn:boolean=false;

  ngOnInit(): void {
    this.myservice.obLoggedIn.subscribe(r => {this.loggedIn = r; console.log('observable logout '+r);});
  }

  ngOnChanges(){
    this.loggedIn = this.myservice.loggedIN;
  }
  OnLogout(e: Event){
    this.router.navigate(['login'])
  }
  constructor(private myservice: LoginService, private service: PortalService, private router: Router){

  }
}
