import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-systemsettings',
    templateUrl: './systemsettings.component.html',
    styleUrls: ['./systemsettings.component.scss']
})
export class SystemsettingsComponent implements OnInit {
    pageTitle = 'System Settings';
    selectedoffice:any = {};
    selectedoffice2: any = {};
    constructor() { }

    ngOnInit() {
    }

}
