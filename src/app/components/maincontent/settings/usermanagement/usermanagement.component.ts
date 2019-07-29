import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api/api.service';
import * as moment from 'moment';
import 'moment-timezone';
import { DatatablesService } from 'src/app/datatables/datatables.service';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';


@Component({
    selector: 'app-usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class UsermanagementComponent implements OnInit, OnDestroy {

    dtOptions: DataTables.Settings = {};
    allusers: any;
    userData: any;
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
    selectacctstatus:any;
    selectedsetsuperuser:any;
    spinnercfmshow=false;
    issuperuser:any;
    pageTitle = 'User Management';
    loadAPI: Promise<any>;
    loggedUser:any;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private renderer: Renderer2,
        private apiService: ApiService,
        private dtService: DatatablesService,
        private httpService: HttpServiceHelper) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {

        this.countrycodes = [
            {'id': 0, 'code': 0},
            {'id': 3, 'code': 44},
            {'id': 1, 'code': 65},
            {'id': 2, 'code': 852}
          ];
        this.renderer.addClass(document.body, 'settings');

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            deferRender: true,
            retrieve: true,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
              
                //this.apiService.dtService(dataTablesParameters).
                this.dtService.dtAllusers(dataTablesParameters).
                subscribe(response => {
                        this.allusers = response.data;
                        console.log(dataTablesParameters);
                        console.log(response);
                        callback({
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: []
                        });
                    });
            },

            columns: [
                {data: 'id' },
                {data: 'name'},
                {data: 'display_name'},
                {data: 'username'},
                {data: 'role_name'},
                {data: 'office_name'},
                {data: 'mobile_phone'},
                {data: 'email'},
                {data: 'updated_at_datetime'},
                {data: 'updated_by_user_display_name'},
                {data: 'account_status'},
                {data: 'created_at_datetime'},
                {data: 'is_super_user'},
                {data: 'actionset'},
                {data: 'actions'}
            ]
        };

        this.httpService.currentUserData.subscribe(userdata =>
            this.loggedUser = userdata['users'][0]
            
            // console.log(userdata['users'])
        );
    }
    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'settings');
    }
    open(content: any) {
        this.modalService.open(content);
    }

    openXL(content: any, email,modal) {

      console.log("email", email)
      // SPINNER/LOADER START
        //this.modalService.open(content, { size: 'xl' });
       // this.getUserDetails(content, email);
    }

    saveEdit() {
        alert();
    }

    getUserDetails(modal, useremail,modalname) {

        this.spinnershow=true;
        
        if(modalname=='mymodaleditaccount'){
            this.modalService.open(modal, { size: 'xl' });
        }else if(modalname=='mymodalremoveaccount'){
            this.modalService.open(modal, { size: 'sm' });
          
            this.processeditdone = false;
        }else{
            this.modalService.open(modal, { size: 'sm' });
         
        }
        
        var datauseremail = {
          'email': useremail
        };

         this.apiService.getUserData(datauseremail).subscribe(
          (response) => {

          //console.log('getuserdata');
          console.log(response);
          if (response.status = 'success') {
          
            this.userData = response.users[0];
            this.offices = response.offices;
            this.roles = response.roles;

            this.selectacctstatus = this.userData.account_status;
            this.issuperuser=this.userData.is_super_user;
            this.selectedsetsuperuser =this.userData.is_super_user;
            this.name = this.userData.name == null ? '--' : this.userData.name;
            this.email = this.userData.email;
            this.username = this.userData.username;

            this.selectedrole = this.userData.role_id;

            this.displayname = this.userData.display_name;

            this.selectedoffice = this.userData.office_id;

           // alert(this.userData.mobile_country_calling_code);

            if (this.userData.mobile_country_calling_code === 0) {
                this.mobileccode = 0;
            } else {
                  this.mobileccode = this.userData.mobile_country_calling_code;
            }

            if (this.userData.mobile_phone === 0) {
                this.mobile_phone = 0;
              } else {
                  this.mobile_phone = this.mobileacode + this.userData && this.userData.mobile_phone;
              }

            if (this.userData.office_country_calling_code === 0) {
                this.officeccode = 0;
            } else {
                  this.officeccode = this.userData.office_country_calling_code;
            }

            if (this.userData && this.userData.office_phone === 0) {
                this.office_phone = 0;
              } else {
                  this.office_phone = this.officeacode + this.userData && this.userData.office_phone;
              }

          }


          this.spinnershow=false;

         // SPINNER/LOADER STOP

          },
          (err) => {
            console.log(err);
          }

         );

    }

    openModal(content: any) {
        this.processeditdone = false;
        this.updatesubmitted=true;

        setTimeout(() =>{

            if(document.querySelectorAll('.is-invalid').length <= 0){
    
              this.modalService.open(content, { size: 'sm' });
              //this.updatesubmitted=false;
            } 
        }
        , 100);

        //this.modalService.open(content, { size: 'sm' });
    }

    changeSuperUser(){

        this.spinnershow = true;
        this.processeditdone = false;
        let issuper;
        if(this.issuperuser == 0){
            issuper=1;
        }else{
            issuper=0;
        }
    
        let userid = this.userData.id;
        let updateData = {
            'id': userid,
            'is_super_user': issuper,
            'updated_at_by_user_id': this.loggedUser.id,
            'updated_by_user_display_name': this.loggedUser.name,
            'updated_by_user_type': this.loggedUser.role_display_name,
            'updated_at_unix_time': moment().unix(),
            'updated_at_tz': moment.tz.guess(),
            'updated_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss')
        
        }

        console.log(updateData);

        this.apiService.updateSuperUser(updateData).subscribe(
            (response) => {
            console.log(response);
    
            this.processeditdone = true;
    
            if (response.status == 'success') {
    
            this.message = 'Successfully updated!';
    
            $('#myTable').DataTable().clear().draw();
    
            } else {
            this.message = 'Update failed!';
            }
    
            this.spinnershow = false;
    
            // SPINNER/LOADER STOP
    
            },
            (err) => {
            console.log(err);
            }
    
        );

    }

    confirmEdit() {
    // SPINNER START
    this.spinnercfmshow = true;
    this.processeditdone = false;

    let userid = this.userData.id;

    let updateData = {
        'id': userid,
        'name': this.name,
        'username': this.username,
        'display_name': this.displayname,
        'mobile_country_calling_code': this.mobileccode,
        'office_id': this.selectedoffice,
        'role_id': this.selectedrole,
        //"mobile_country_area_code":this.mobile_phone.substring(0, 3),
        'mobile_phone': !this.mobile_phone? 0 : this.mobile_phone,
        'office_country_calling_code': this.officeccode,
        // "office_country_area_code":this.office_phone.substring(0, 3),
        'office_phone': !this.office_phone? 0 : this.office_phone,
        'account_status': this.selectacctstatus,
        'updated_at_by_user_id': this.loggedUser.id,
        'updated_by_user_display_name': this.loggedUser.name,
        'updated_by_user_type': this.loggedUser.role_display_name,
        'updated_at_unix_time': moment().unix(),
        'updated_at_tz': moment.tz.guess(),
        'updated_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss')

    };
    console.log(updateData);
    console.log( this.loggedUser);

    this.apiService.updateUser(updateData).subscribe(
        (response) => {
        console.log(response);

        this.processeditdone = true;

        if (response.status == 'success') {

        this.message = 'Successfully updated!';

        $('#myTable').DataTable().clear().draw();

        } else {
        this.message = 'Update failed!';
        }

        this.spinnercfmshow = false;

        // SPINNER/LOADER STOP

        },
        (err) => {
        console.log(err);
        }

    );

    // console.log(updateData);
    //console.log(userid);
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
