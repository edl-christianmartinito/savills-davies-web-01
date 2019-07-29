import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-mydashboard',
    templateUrl: './mydashboard.component.html',
    styleUrls: ['./mydashboard.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class MydashboardComponent implements OnInit, OnDestroy {

    userData;
    url = "https://graph.microsoft.com/v1.0/me";
    private subscription: Subscription

    // dtOptions: DataTables.Settings = {};
    pageTitle = 'Dashboard';
    dashboards = [
        { 'id': 1, 'name': 'angular1' },
        { 'id': 2, 'name': 'angular2' },
        { 'id': 3, 'name': 'angular3' },
        { 'id': 4, 'name': 'angular4' },
        { 'id': 5, 'name': 'angular5' }
    ];

    loadAPI: Promise<any>;

    constructor(private router: Router,
        private renderer: Renderer2,
        private authService: MsalService,
        private httpService: HttpServiceHelper,
        private broadcastService: BroadcastService,
        config: NgbModalConfig,
        private modalService: NgbModal) { 
            config.backdrop = 'static';
            config.keyboard = false;
        }

    ngOnInit() {
        this.pageTitle = this.pageTitle;

       

    }

    open(content: any) {
        this.modalService.open(content);
    }

  

    ngOnDestroy() {
        this.broadcastService.getMSALSubject().next(1);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSelect(dashboards) {
        this.router.navigate(['/dashboard', dashboards.id]);
    }

    addJsToElement(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    removescriptbeforeHTML() {
        const body = document.getElementsByTagName('html')[0];
        console.log('body childNodes', body.childNodes);
        console.log('body childNodes length', body.childNodes.length);
        let found = false;
        let cur = 0;
        for (let i = 0; i < body.childNodes.length; i++) {

            if (body.childNodes[i].nodeName === 'SCRIPT') {
                cur = i + 1;
                found = true;


            } else {
                found = false;
            }

            if (found) {
                console.log('i am a script tag remove tat', body.childNodes[i]);
                body.removeChild(body.childNodes[i]);
            }
        }
    }

    loadScripts2() {

        const dynamicScripts = [
            // 'assets/js/dev_dashboard_datatable.js',
            // 'assets/js/dev.js',
            // 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js'
        ];
        for (let x = 0; x < dynamicScripts.length; x++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[x];
            node.type = 'text/javascript';
            node.async = false;
            // node.charset = 'utf-8';
            document.getElementsByTagName('html')[0].appendChild(node);
        }

    }

    public loadScript() {
        console.log('loadScript');

        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isFound = true;
                console.log('loadScript isFound', isFound);
            }
        }

        if (!isFound) {
            const dynamicScripts = [
                'assets/js/dev_dashboard_datatable.js',
                'assets/js/dev.js'
            ];

            for (let i = 0; i < dynamicScripts.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts[i];
                node.type = 'text/javascript';
                node.async = false;
                // node.charset = 'utf-8';

                document.getElementsByTagName('html')[0].appendChild(node);
            }

        }
    }

}
