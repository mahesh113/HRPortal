import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/LoginService';
import { EmployeeModel } from '../shared/employee.model';
import { PortalService } from '../shared/portal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute,
              private service: PortalService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  id: number;
  sub: Subscription;
  employee: EmployeeModel = {} as EmployeeModel

  ngOnInit(): void {
    if(!this.loginService.loggedIN){  
      if(this.loginService.loginId != undefined){
        this.service.isLoggedIn(this.loginService.loginId).subscribe((resp) => {
          console.log('RESP = '+resp)
          if(!resp){
            this.router.navigate(['login'])  // go back to login page if user is not logged in already, even on refresh page.
          }
          else{
            console.log('Logged in info found ')
          }
        })
      }
      else{
        this.router.navigate(['login'])
      }
    }
    this.id = this.activeRoute.snapshot.params['id'];
    this.sub = this.service.getEmployeeById(this.id)
              .subscribe(resp => 
                this.employee=resp)
    console.log('employee returned ='+  this.employee)
                
  }
  onSubmit(form: NgForm){
    console.log(this.employee) 
    this.service.postEmployeeUpdate(this.employee)
                .subscribe(resp => console.log('update response '+ resp))
                
    this.router.navigate(['reviews'])
  }

}
