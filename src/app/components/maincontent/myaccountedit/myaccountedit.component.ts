import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment-timezone';
import { of } from 'rxjs';
declare var $ : any;

@Component({
  selector: 'app-myaccountedit',
  templateUrl: './myaccountedit.component.html',
  styleUrls: ['./myaccountedit.component.scss']
})
export class MyaccounteditComponent implements OnInit, OnDestroy {
    modal_myacc:any = {};

    loggedUserEmail: string;
    userData: any[] = [];
    offices: any;
    roles: any;
    selectedoffice: any;
    selectedrole: any;
    displayname: string;
    email: string;
    username: string;
    name: string;
    countrycodes: any;
    mobileccode: any;
    mobileacode: any;
    mobile_phone: any;
    officeccode: any;
    officeacode: any;
    officenumber: any;
    office_phone: any;
    spinnershow = false;
    processeditdone = false;
    message: string;

    updatesubmitted=false;


    pageTitle = 'My Account';
    pageTitleBC = 'Edit My Account';
    pageID = 1;
    constructor(private router: Router,
      private apiservice: ApiService,
      private httpService: HttpServiceHelper,
      private modalService: NgbModal) { }

    ngOnInit() {

      this.countrycodes = [
            {'id': 0, 'code': 0},
            {'id': 3, 'code': 44},
            {'id': 1, 'code': 65},
            {'id': 2, 'code': 852}
          ];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('myaccountedit');

        this.httpService.currentUserEmail.subscribe(loggedemail => this.loggedUserEmail = loggedemail);

        // alert(this.loggedUserEmail);

        this.httpService.currentUserData.subscribe(userdata => {


            this.userData = userdata['users'];
            this.offices = userdata['offices'];
            this.roles = userdata['roles'];
            // console.log(userdata['offices']);
            // console.log(this.countrycodes);
            // console.log(this.userData && this.userData[0]);

            if (this.userData && this.userData[0].office_id === 0) {
                this.selectedoffice = 1;
            } else {
                this.selectedoffice = this.userData && this.userData[0].office_id;
            }

            if (this.userData && this.userData[0].name === null) {
                this.name = '--';
            } else {
                this.name = this.userData && this.userData[0].name;
            }

            this.username = this.userData && this.userData[0].username;

            this.email = this.userData && this.userData[0].email;

            this.selectedrole = this.userData && this.userData[0].role_id;

            this.displayname = this.userData && this.userData[0].display_name;

            if (this.userData && this.userData[0].mobile_country_calling_code === 0) {
              this.mobileccode = 0;
            } else {
                this.mobileccode = this.userData && this.userData[0].mobile_country_calling_code;
            }

            // if(this.userData && this.userData[0].mobile_country_area_code === 0){
            //   this.mobileacode = "---";
            // }else{
            //     this.mobileacode = this.userData && this.userData[0].mobile_country_area_code;
            // }

            if (this.userData && this.userData[0].mobile_phone === 0) {
              this.mobile_phone = "";
            } else {
                this.mobile_phone = this.mobileacode + this.userData && this.userData[0].mobile_phone;
            }

            if (this.userData && this.userData[0].office_country_calling_code === 0) {
              this.officeccode = 0;
            } else {
                this.officeccode = this.userData && this.userData[0].office_country_calling_code;
            }

            // if(this.userData && this.userData[0].office_country_area_code === 0){
            //   this.officeacode = "---"
            // }else{
            //     this.officeacode = this.userData && this.userData[0].office_country_area_code;
            // }

            if (this.userData && this.userData[0].office_phone === 0) {
              this.office_phone ="";
            } else {
                this.office_phone = this.officeacode + this.userData && this.userData[0].office_phone;
            }

        });




    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('myaccountedit');
    }

    handlebackClick() {
        this.router.navigateByUrl('/dashboard/myaccount');
    }

    getOfficesRoles() {

      this.apiservice.getOfficesRoles().subscribe(
            (response) => {
            console.log(response);

              this.offices = response.offices;

              console.log( this.offices);

              this.selectedoffice = 2;
          // SPINNER/LOADER STOP

            },
            (err) => {
              console.log(err);
            }

          );

    }

    handlesaveClick() {

      console.log(this.userData);
       // this.router.navigateByUrl('/dashboard/myaccount/');



    }


    openModal(content: any) {

      this.processeditdone = false;
      this.updatesubmitted=true;
      // alert(this.office_phone);

      // alert(document.querySelectorAll('.is-invalid').length);


      //this.modalService.open(content, { size: 'sm' });

      setTimeout(() =>{

        if(document.querySelectorAll('.is-invalid').length <= 0){

          this.modalService.open(content, { size: 'sm' });
          //this.updatesubmitted=false;
        } 
    }
    , 100);


    }

    confirmEdit() {
      // SPINNER START
      this.spinnershow = true;
      this.processeditdone = false;

      console.log(this.userData);

      let userid = this.userData[0].id;

      let updateData = {
        'id': userid,
        'name': this.name,
       'username': this.username,
        'display_name': this.displayname,
        'mobile_country_calling_code': !this.mobileccode? 0 :this.mobileccode,
        'office_id': this.selectedoffice,
        'role_id': this.selectedrole,
        'account_status':this.userData && this.userData[0].account_status,
        //"mobile_country_area_code":this.mobile_phone.substring(0, 3),
        'mobile_phone': !this.mobile_phone ? 0 :this.mobile_phone ,
        'office_country_calling_code': this.officeccode,
       // "office_country_area_code":this.office_phone.substring(0, 3),
        'office_phone': this.office_phone,
        'updated_at_by_user_id': userid,
        'updated_by_user_display_name': this.displayname,
        'updated_by_user_type': this.userData && this.userData[0].role_display_name,
        'updated_at_unix_time': moment().unix(),
        'updated_at_tz': moment.tz.guess(),
        'updated_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss')

      };
      console.log(updateData);

       this.apiservice.updateUser(updateData).subscribe(
        (response) => {
        console.log(response);

        this.processeditdone = true;

        if (response.status == 'success') {
          this.httpService.getUserData(response);
          this.message = 'Successfully updated!';
          this.router.navigateByUrl('/dashboard/myaccount');

        } else {
          this.message = 'Update failed!';
        }

        this.spinnershow = false;

       // SPINNER/LOADER STOP

        },
        (err) => {
          this.spinnershow = false;
          this.message = 'Update failed!';
          console.log(err);
        }

      );

      console.log(updateData);
      console.log(userid);
    }

    getUserDetails(useremail) {
      // SPINNER/LOADER START
      var datauseremail = {
        'email': useremail
      };

       this.apiservice.getUserData(datauseremail).subscribe(
        (response) => {

        console.log('getuserdata');
        console.log(response);
        this.httpService.getUserData(response.users[0]);
        this.userData = response.users[0];

        this.offices = response.offices;
        this.roles = response.roles;


       // SPINNER/LOADER STOP

        },
        (err) => {
          console.log(err);
        }

       );

    }

    OnlyNumbers($event) {
      let regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
      let specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight','ArrowLeft'];
      if (specialKeys.indexOf($event.key) !== -1) {
        return;
      } else {
        if (regex.test($event.key)) {
          return true;
        } else {
          return false;
        }
      }
    }


}
