import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { LoginService } from '../shared/LoginService';
import { PortalService } from '../shared/portal.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: PortalService, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  Onlogout(){

    this.service.logOut(this.loginService.loginId).subscribe(resp => {
      if(resp){
        this.loginService.loggedIN = false;
        this.loginService.obLoggedIn.next(false);
        this.loginService.loginId = null;
      }
    })
  
}

}
