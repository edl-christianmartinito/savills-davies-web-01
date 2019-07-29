import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-dropdownlist',
    templateUrl: './dropdownlist.component.html',
    styleUrls: ['./dropdownlist.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class DropdownlistComponent implements OnInit, OnDestroy {
    pageTitle = 'Dropdown';
    constructor(config: NgbModalConfig,
        private modalService: NgbModal,
        private renderer: Renderer2) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.renderer.addClass(document.body, 'settings');
    }
    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'settings');
    }
    open(content: any) {
        this.modalService.open(content);
    }
    openXL(content: any) {
        this.modalService.open(content, { size: 'xl' });
    }
}
