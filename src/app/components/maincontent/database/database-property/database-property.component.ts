import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-database-property',
  templateUrl: './database-property.component.html',
  styleUrls: ['./database-property.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class DatabasePropertyComponent implements OnInit {
  pageTitle: string = 'Property';
  pagetitleBC = 'Database';
  crumbs = 'Database';
  constructor(config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  openXL(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
