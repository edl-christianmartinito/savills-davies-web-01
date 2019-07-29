import { Component, OnInit, Input, AfterViewInit,ViewChild, ElementRef,ViewEncapsulation} from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import * as moment from 'moment';
import 'moment-timezone';
import { MsalService } from '@azure/msal-angular';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantPool } from '@angular/compiler';




declare var $: any;

@Component({
    selector: 'app-maincontent',
    templateUrl: './maincontent.component.html',
    styleUrls: ['./maincontent.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NgbModalConfig, NgbModal]
})



export class MaincontentComponent implements OnInit {
    useremail: any;
    name:any;
    modalupdate = 'modalupdateopen';
    processing = false;
    offices: any;
    selectedoffice: any;
    displayname: any;
    loadingalldata=true;
    createsubmitted=false;
    countrycodes = [
        {'id': 0, 'code': 0},
        {'id': 3, 'code': 853},
        {'id': 1, 'code': 65},
        {'id': 2, 'code': 852}
      ];
      officeccode:any;
      mobileccode:any;
      mobile_phone:any;
      office_phone:any;
      processdone=false;
      message:string;

@ViewChild('modalDisabledUser') modaldisableduser: ElementRef;

    constructor(
            private apiservice: ApiService,
            private authService: MsalService,
            private httpService: HttpServiceHelper,
            config: NgbModalConfig,
            private modalService: NgbModal,
          ) {
            config.backdrop = 'static';
            config.keyboard = false;
            this.loadScripts();
          }

    ngOnInit() {
        
       // console.log('ngOnInit BOOM');
        //console.log(this.authService.getUser());
         this.useremail = this.authService.getUser().displayableId;
         this.getUserDetails(this.useremail);
        // this.openModal_auto();
        this.httpService.getLoggedUserEmail(this.useremail);
        this.officeccode=0;
        this.mobileccode=0;
            

    }
 

    loadScripts() {

        const dynamicScripts = [
            'assets/dist/js/sidebarmenu.js',
        ];
        for (let x = 0; x < dynamicScripts.length; x++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[x];
            node.type = 'text/javascript';
            node.async = false;
            document.getElementsByTagName('html')[0].appendChild(node);
        }

    }

    getUserDetails(useremail) {
        // SPINNER/LOADER START
        // this.modalService.open(NgbdModalLoading);
        const datauseremail = {
            'email': useremail
        };

        this.apiservice.getUserData(datauseremail).subscribe(
            (response) => {
               // console.log(response);

                if (response.result === 'not_found') {
                    // CREATE USER
                            //this.createNewUser();
                    this.offices = response.offices;
                    this.selectedoffice = 1;
                    this.displayname = this.useremail.substring(0, this.useremail.indexOf('@'));
                    // ?this.openModal_auto();
                   // alert();
                    this.loadingalldata=false;
                   $('#modalupdateopen').modal('show');
                   // this.modalService.open(this.modalupdate,{ size: 'sm' });
                } else {

                    console.log(response.users[0]);

                    if(response.users[0].account_status==0){             
                       setTimeout(() =>{

                          //alert();
                          //console.log(this.modaldisableduser);
                         // console.log(this.nameInputRef.nativeElement.ViewChild);
                            this.modalService.open(this.modaldisableduser,{backdropClass: 'dark-opacity'});
                        
                         
                        }
                        , 100);
                    }
                    
                    this.httpService.getUserData(response);
                    this.loadingalldata=false;

                    // this.httpService.changeDisplayName(response.users[0].display_name)
                }
                // SPINNER/LOADER STOP

                // this.modalService.close(NgbdModalLoading);
            },
            (err) => {
                alert('ERR: Please contact Administrator.');
                console.log(err);
            }
        );
    }

    openModal(content: any) {

        this.modalService.open(content, { size: 'sm' });
    }

    createNewUser() {

        this.createsubmitted=true;

        setTimeout(() =>{

            if(document.querySelectorAll('.is-invalid').length <= 0){
    
                this.processing=true;

       const display_username = this.useremail.substring(0, this.useremail.indexOf('@'));

        const data = {
            'created_at_unix_time': moment().unix(),
            'created_at_tz': moment.tz.guess(),
            'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
            'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss'),
            'email': this.useremail,
            'name': this.name,
            'username': display_username,
            'mobile_country_calling_code':this.mobileccode,
            'mobile_phone':!this.mobile_phone?0 :this.mobile_phone,
            'office_country_calling_code':this.officeccode,
            'office_phone':!this.office_phone?0 :this.office_phone,
            'role_id': 3,
            'office_id': this.selectedoffice,
            'display_name': this.displayname,
            'account_status': 1
        };

        this.apiservice.saveUserPersonalDetails(data).subscribe(
            (response) => {
                console.log(response);

                if (response.status === 'success') {

                    // this.httpService.changeDisplayName(display_name);
                    this.httpService.getUserData(response);

                    //this.loadingalldata=false;
                    this.processing=false;
                    this.processdone=true;
                    this.message="Successfully registered to DAVIES."
                  //  $('#modalupdateopen').modal('hide');

                } else {
                    //$('#modalupdateopen').modal('hide');
                    this.processing=false;
                    this.processdone=true;
                    alert('ERR: 1001: Not Saved');
                }


            },
            (err) => {
                console.log(err);
            }

        );
             
            } 
        }
        , 100);

        
    }
    closeUpdate(){
        $('#modalupdateopen').modal('hide');
    }

    UpdatePersonalInfo() {
        const data = {
            'created_at_unix_time': moment().unix(),
            'created_at_tz': moment.tz.guess(),
            'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
            'created_at_by_user_id': '',
            'created_by_user_type': '',
            'created_by_user_display_name': '',
            'is_test': 1,
            'source': '',
            'name': 'wendell 23 test',
            'display_name': 'Wendell',
            'email': this.useremail,
            'username': this.useremail,
            'role_id': '',
            'office_id': '',
            'mobile_country_calling_code': 65,
            'mobile_country_area_code': 82,
            'mobile_phone': 23584,
            'office_country_calling_code': '',
            'office_country_area_code': '',
            'office_phone': ''
        };

        console.log(data);

    }
    cancelUpdate() {
        this.authService.logout();
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
