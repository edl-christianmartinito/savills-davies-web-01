import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-useraccessrole',
    templateUrl: './useraccessrole.component.html',
    styleUrls: ['./useraccessrole.component.scss']
})
export class UseraccessroleComponent implements OnInit, OnDestroy {
    pageTitle = 'User Role Access';
    disablecheck = true;
    showEditButton = true;
    showSaveButton = false;
    ReadOnlyStyleGuideNotes: boolean;
    model_useraccess:any = {};

    // dtOptions: DataTables.Settings = {};
    constructor(private renderer: Renderer2) {
        this.disablecheck = true;
        this.showEditButton = false;
        this.showSaveButton = true;
    }

    ngOnInit() {
        this.renderer.addClass(document.body, 'settings');
        this.ReadOnlyStyleGuideNotes = true;
        this.model_useraccess={};
    }
    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'settings');
    }

    useraccess_edit() {
        console.log('i am clicked useraccess_edit');
        this.disablecheck = false;
        this.showSaveButton = false;
        this.showEditButton = true;
    }

    useraccess_save() {
        console.log('i am clicked useraccess_edit');
        this.disablecheck = true;
        this.showSaveButton = true;
        this.showEditButton = false;
    }

}
