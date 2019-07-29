import { Component, OnInit, OnDestroy, HostBinding, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    // tslint:disable-next-line: use-host-property-decorator
    host: { 'class': 'someClass' },
    providers: [NgbModalConfig, NgbModal]
})
export class NavigationComponent implements OnInit, OnDestroy {
    model: any = {};
    isSubmitted = false;
    formGroup: FormGroup;
    display_name: string;
    userData: any[] = [];
    issuperuser=false;;

    // tslint:disable-next-line: max-line-length
    constructor(private cdRef: ChangeDetectorRef,
        private authService: MsalService,
        private http: HttpClient,
        private httpService: HttpServiceHelper,
        private broadcastService: BroadcastService,
        config: NgbModalConfig,
        private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    url = 'https://graph.microsoft.com/v1.0/me';
    private subscription: Subscription;
    someField = false;
    open(content: any) {
        this.modalService.open(content);
    }

    ngOnInit() {
        console.log("navigation INIT");
        this.someField = true;

        // this.httpService.currentMessage.subscribe(message=>this.display_name=message);
        // userdata:this.userData;
        this.httpService.currentUserData.subscribe(userdata =>
            this.userData = userdata['users']
            
            // console.log(userdata['users'])
        );
      
       
        // this.userData = this.userData.users[0];

        // this.formGroup = new FormGroup({
        //     Email: new FormControl('', [
        //         Validators.required,
        //         Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        //     ]),
        //     Password: new FormControl('', [
        //         Validators.required,
        //         Validators.minLength(8),
        //         Validators.maxLength(20)
        //     ]),
        // });

        
     // setTimeout(() =>{
            //console.log(this.userData && this.userData[0]);
            this.issuperuser = this.userData && this.userData[0].is_super_user==1?true:false;
      
   // }
   // , 100);
   
    }




    ngOnDestroy() {
        this.broadcastService.getMSALSubject().next(1);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    logout() {
        this.authService.logout();
        // alert();
    }

    onSubmit() {
        console.log(this.formGroup);
    }

    onReset() {
        this.formGroup.reset();
    }

}
