import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeAdapter, EmployeeModel, EmployeeReqAdapter } from './employee.model';
import { map } from "rxjs/operators";
import { Constants } from './Constants';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  //LoginEndpoint=UserEndpoint+
  constructor(private http:HttpClient, private adapter: EmployeeAdapter
    , private adapterEmp: EmployeeReqAdapter
    , private env: Constants) { }

  getInReviewEmployees(): Observable<Employee[]>{
    return this.http.get(this.env.InReviewEmpEndpoint).pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    )
  }

  getEmployeeById(id:number){
    return this.http.get(this.env.EmployeeEndpoint+'/'+id).pipe(
      map( (data: any) => 
        
          this.adapterEmp.adapt(data))
    )
  }

  logOut(id){
    return this.http.get(this.env.LogoutEndpoint+'/'+id);
  }
  userLogin(id: bigint, pass: string){
    //var passHash = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex)
    
    var url = this.env.LoginEndpoint+"?userId="+id+"&passwordHash="+pass;
    return this.http.post(url, {  });
  }

  postEmployeeUpdate(emp: EmployeeModel){
    return this.http.post(this.env.EmployeeEndpoint, emp);
  }

  isLoggedIn(id){
    return this.http.get(this.env.IsLoggedInEndpoint+'/'+id)    ;
  }
}
