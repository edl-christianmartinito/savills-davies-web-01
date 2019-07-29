import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobreports',
  templateUrl: './jobreports.component.html',
  styleUrls: ['./jobreports.component.scss']
})
export class JobreportsComponent implements OnInit {
  pageTitle: string = "Job Reports"; 
  constructor() { }

  ngOnInit() {
  }

}
