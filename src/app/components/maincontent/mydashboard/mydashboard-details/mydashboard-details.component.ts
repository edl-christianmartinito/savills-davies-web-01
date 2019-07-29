import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mydashboard-details',
  templateUrl: './mydashboard-details.component.html',
  styleUrls: ['./mydashboard-details.component.scss']
})
export class MydashboardDetailsComponent implements OnInit {
  pageTitle: string = "Dashboard Details";
  public departmentId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.departmentId = id;
  }
  
  goPrevious(){}

  goNext(){}
}
