import { Component, OnInit,OnDestroy } from '@angular/core';
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import {Subscription} from "rxjs/Subscription";
import { Router } from "@angular/router";

@Component({
  selector: 'app-loginauthentication',
  templateUrl: './loginauthentication.component.html',
  styleUrls: ['./loginauthentication.component.scss']
})
export class LoginauthenticationComponent implements OnInit {

  loggedIn : boolean;
  public userInfo: any = null;
  private subscription: Subscription;
  public isIframe: boolean;

  constructor(private broadcastService: BroadcastService , private authService : MsalService,   private router: Router) { 
    this.isIframe = window !== window.parent && !window.opener;

    if(this.authService.getUser()){
      this.loggedIn = true;
      //alert('1');
      if(!this.isIframe){
        this.router.navigate(['/dashboard']);
      }
      
    }
      else {
      this.loggedIn = false;
    }

  }

  ngOnInit() {

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      //console.log("login failure " + JSON.stringify(payload));
      this.loggedIn = false;

    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
     // console.log("login success " + JSON.stringify(payload));
      this.loggedIn = true;
      //alert('2');
      if(!this.isIframe){
        this.router.navigate(['/dashboard']);
      }
    });
  }

  login()
  {
   this.authService.loginPopup(["user.read","api://259e1e45-d02d-4758-96e5-34c33b9c2712/user.read"]); // IAT
  //  this.authService.loginPopup(["user.read","https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user.read"]); // UAT
  }
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
