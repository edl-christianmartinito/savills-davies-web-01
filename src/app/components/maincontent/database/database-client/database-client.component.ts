import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-database-client',
  templateUrl: './database-client.component.html',
  styleUrls: ['./database-client.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class DatabaseClientComponent implements OnInit {
  pageTitle: string = 'Company';
  pagetitleBC = 'Database';
  crumbs = 'Database';
  constructor( config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  open(longContent: any) {
    this.modalService.open(longContent);
  }

  openXL(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
