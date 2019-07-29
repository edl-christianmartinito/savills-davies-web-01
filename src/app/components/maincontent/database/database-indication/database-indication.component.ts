import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-database-indication',
    templateUrl: './database-indication.component.html',
    styleUrls: ['./database-indication.component.scss']
})
export class DatabaseIndicationComponent implements OnInit {
    pageTitle = 'Indication';
    pagetitleBC = 'Database';
    crumbs = 'Database';
    constructor() { }

    ngOnInit() {
    }

}
