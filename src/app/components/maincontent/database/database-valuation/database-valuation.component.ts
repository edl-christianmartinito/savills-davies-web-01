import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database-valuation',
  templateUrl: './database-valuation.component.html',
  styleUrls: ['./database-valuation.component.scss']
})
export class DatabaseValuationComponent implements OnInit {
  pageTitle: string = "Evaluation";
  pagetitleBC = 'Database';
  crumbs = 'Database';
  constructor() { }

  ngOnInit() {
  }

}
