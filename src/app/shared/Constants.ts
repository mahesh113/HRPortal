import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public readonly EmployeeEndpoint: string ="https://localhost:44301/api/employees"
    public readonly UserEndpoint="https://localhost:44301/api/users"
    public readonly LoginEndpoint= this.UserEndpoint +'/signin'
    public readonly LogoutEndpoint= this.UserEndpoint +'/signout'
    public readonly InReviewEmpEndpoint= this.EmployeeEndpoint + "/in-review"
    public readonly IsLoggedInEndpoint= this.UserEndpoint + "/IsLoggedIn"
}