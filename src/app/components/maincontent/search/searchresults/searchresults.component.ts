import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {
  pageTitle = 'Search Results';
  constructor() { }

  ngOnInit() {
  }

}
