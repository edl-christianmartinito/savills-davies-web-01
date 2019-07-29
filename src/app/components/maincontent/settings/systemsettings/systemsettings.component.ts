import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-systemsettings',
    templateUrl: './systemsettings.component.html',
    styleUrls: ['./systemsettings.component.scss']
})
export class SystemsettingsComponent implements OnInit, OnDestroy {
    pageTitle = 'System Settings';
    selectedoffice:any = {};
    selectedoffice2: any = {};
    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(document.body, 'settings');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'settings');
    }

}
