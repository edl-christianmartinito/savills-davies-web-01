import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnDestroy {
    pageTitle = 'My Account';
    pageID = 1;
    editMode = false;
    loggedUserEmail: string;
    //userData:any[] = [];
    userData:any;
    office: string;
    role: string;

    constructor(private router: Router,
        private httpService: HttpServiceHelper,
        private apiservice: ApiService) { }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('myaccount');

        this.httpService.currentUserEmail.subscribe(loggedemail => this.loggedUserEmail = loggedemail);
    
        // this.httpService.currentUserData.subscribe(userdata=>{
        //       this.userData=userdata['users']
              
        //   } 
        //   );
       
       console.log(this.loggedUserEmail);
 
        this.getUserDetails(this.loggedUserEmail);

    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('myaccount');

       

    }

    handleEditClick() {
        this.router.navigateByUrl('/dashboard/myaccountedit');
       // this.router.navigateByUrl('/dashboard/myaccountedit');
    }

    getUserDetails(useremail){

    //// SPINNER/LOADER START

        var datauseremail = {
          'email': this.loggedUserEmail
        }
        
    
        this.apiservice.getUserData(datauseremail).subscribe(
          (response) => {
            console.log(response);

            this.userData = response.users[0];

           this.httpService.getUserData(response);

                response.roles.forEach(roles => {

                    if (roles.id === response.users[0].role_id){
                     
                      this.role = roles.name;
                    
                    }
        
                  });

                  response.offices.forEach(office => {
    
                    if (office.id === response.users[0].office_id){
                     
                      this.office = office.name;
                    
                    }
        
                  });

        //// SPINNER/LOADER END
    
          },
          (err) => {
            console.log(err);
          }
    
         )
    
    }
}
