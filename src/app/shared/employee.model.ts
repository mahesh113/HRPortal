import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
export class Employee {
  constructor(
    public Id: bigint,
    public EmailId: string,
    public Mobile: string,
    public FirstName: string,
    public LastName: string,
    public Department: string,
    public Status: string

  ) {}
}
export class EmployeeModel {
  constructor(
    public Id: bigint,
    public EmailId: string,
    public Mobile: string,
    public FirstName: string,
    public LastName: string,
    public Department: number,
    public Status: number

  ) {}
}

  @Injectable({
    providedIn: "root",
  })
  export class EmployeeReqAdapter implements Adapter<EmployeeModel> {
    adapt(item: any): EmployeeModel {
      return new EmployeeModel(item.id, item.emailId, item.mobile, 
        item.firstName, item.lastName, item.department, item.status);
    }
  }

  
  @Injectable({
    providedIn: "root",
  })
  export class EmployeeAdapter implements Adapter<Employee> {
    adapt(item: any): Employee {
      return new Employee(item.id, item.emailId, item.mobile, 
        item.firstName, item.lastName, item.department, item.status);
    }
  }