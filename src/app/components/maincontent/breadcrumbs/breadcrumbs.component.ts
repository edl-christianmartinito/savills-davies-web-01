import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
    @Input() pagetitle: string;
    @Input() pagetitleBC: string;
    @Input() pagecrumbs: string;
    constructor() {  }

  ngOnInit() {
  }

}
