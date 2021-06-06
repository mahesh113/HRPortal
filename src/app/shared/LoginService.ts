import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoginService{

obLoggedIn :Subject<boolean> = new Subject<boolean>();
loggedIN:boolean = false;
loginId:bigint;
logout: Subject<any> = new Subject<any>();

}   