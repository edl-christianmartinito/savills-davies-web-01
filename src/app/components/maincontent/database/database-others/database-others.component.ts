import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database-others',
  templateUrl: './database-others.component.html',
  styleUrls: ['./database-others.component.scss']
})
export class DatabaseOthersComponent implements OnInit {
  pageTitle: string = "Others";
  pagetitleBC = 'Database';
  crumbs = 'Database';
  constructor() { }

  ngOnInit() {
  }

}
