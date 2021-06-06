import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/LoginService';
import { Employee, EmployeeModel } from '../shared/employee.model';
import { PortalService } from '../shared/portal.service'; 


@Component({
  selector: 'app-employee-review',
  templateUrl: './emp-review.component.html',
  styleUrls: ['./emp-review.component.css']
})
export class EmpReviewComponent implements OnInit, OnDestroy  {

  empList: Employee[] = []; 
  sub: Subscription
  constructor(private router: Router,
              private service: PortalService,
              private loginService: LoginService) { 
                this.router.routeReuseStrategy.shouldReuseRoute = () => {
                  return false;
                };
              }
                
  ngOnInit(): void {
        /*if(!this.loggedIn){
      this.router.navigate(['login'])
      this.global.setLoggedIn(true);
      this.loggedIn = true;
    } */

    // check if loggedin

    if(!this.loginService.loggedIN){
      console.log('not logged in')
      if(this.loginService.loginId != undefined){
        this.service.isLoggedIn(this.loginService.loginId).subscribe((resp) => {
          console.log('RESP = '+resp)
          if(!resp){
            this.router.navigate(['login'])  // go back to login page if user is not logged in already.
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
    
    // get employees
    this.sub =   this.service.getInReviewEmployees()
                .subscribe((response) =>{
                  this.empList = response
                });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  Approve(Id){
    let emp:  EmployeeModel;
    this.service.getEmployeeById(Id)
            .subscribe((response) => {
              emp = response;
              emp.Status=1;
              this.service.postEmployeeUpdate(emp)
                    .subscribe(resp => this.router.navigate(['reviews']));    

            });
    
  }
  Reject(Id){
    let emp:  EmployeeModel;
    this.service.getEmployeeById(Id)
            .subscribe((response) => {
              emp = response;
              emp.Status=2;
              this.service.postEmployeeUpdate(emp)
                    .subscribe(resp => this.router.navigate(['reviews']));    

            });
  }
  Edit(Id){
    console.log('Edit id '+Id)
    this.service.getEmployeeById(Id)
            .subscribe((response) => {

              this.router.navigate(['/users', Id])
            });
  }

}
