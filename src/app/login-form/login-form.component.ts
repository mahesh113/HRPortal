import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {PortalService} from '../shared/portal.service'
import { LoginService } from '../shared/LoginService';
//import bcrypt from 'bcrypt'
import * as bcrypt from 'bcryptjs'


/*  ====================================================
COMMENTS: 
  Using reactive approach for angular form in this component.

  I tried to use the bcrypt to Salt the password and send to api for authentication.
  Due to some reason project was giving run time error when I call he SaltIt function. 
  So I am skipping create PasswordSalt, but API is still checking the PasswordSalt for verification.

  *Update*
  I am using bcryptjs instead to salt the password. I am not sure if after salting the password will match or not because if you are using your own database and hashing also
  then it may not match with password hashed by my frontend logic, but the logic currently is to hash password
  using salt and comparing the hashed password with the one stored in db. Real password is NOT stored in db. 

  After login, use can goto review or user page. Without login it is not allowed in the frontend application.

    ==================================================== */
 @Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit,OnChanges {

  constructor(private portalService: PortalService,
              private router: Router,
              private loginService: LoginService) { 
    
  }
   ngOnChanges(changes: SimpleChanges): void {
     throw new Error('Method not implemented.');
   }
  
   errorMsg = '';
  hrForm = new FormGroup({
    userName: new FormControl('4650'),
    password: new FormControl('sfalsflksadfl'), 
  });

  ngOnInit(): void {
  }

  onSubmit(){
    var userName = this.hrForm.controls.userName.value;
    const salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(this.hrForm.controls.password.value, salt);
    //var password = this.SaltIt(this.hrForm.controls.password.value)
    //var password = this.hrForm.controls.password.value
    this.portalService.userLogin(userName,
                        password)
                        .subscribe((result)=> {
                          if(result){
                            this.loginService.obLoggedIn.next(true)
                            this.loginService.loggedIN = true;
                            this.loginService.loginId = userName;
                            this.router.navigate(['reviews'])
                            this.errorMsg = ''
                          }
                        },
                        (err) =>{
                          this.errorMsg = 'Either username or password is wrong.'
                        })

                        
  }

  /*private SaltIt(pwd:any){
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(pwd, salt, function(err, hash) {
      // returns hash
        console.log(hash);
        return hash;
      });
    });
    return "test"
  }*/

}
