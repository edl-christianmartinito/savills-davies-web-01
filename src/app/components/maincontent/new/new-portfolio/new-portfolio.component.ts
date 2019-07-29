import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.scss']
})
export class NewPortfolioComponent implements OnInit {
  pageTitle: string = "Portfolio"; 
  constructor() { }

  ngOnInit() {
  }

}
