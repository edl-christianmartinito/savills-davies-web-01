import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caveats',
  templateUrl: './caveats.component.html',
  styleUrls: ['./caveats.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class CaveatsComponent implements OnInit, OnDestroy {

  @ViewChild('fullpageRef') fp_directive: ElementRef;
  config;
  fullpage_api;
  pageTitle = 'Caveats';
  loadAPI: Promise<any>;
  // dtOptions: DataTables.Settings = {};

  constructor(private renderer: Renderer2,
    config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      this.removescriptbeforeHTML();
      this.loadScript();
      // this.removedupScript();
      resolve(true);
    });
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnDestroy() {
    console.log('i will be out');
    this.removescriptbeforeHTML();
  }

  public removescriptbeforeHTML() {
    const body = document.getElementsByTagName('html')[0];
    let found = false;
    let cur = 0;
    for (let i = 0; i < body.childNodes.length; i++) {

      if (body.childNodes[i].nodeName === 'SCRIPT') {
        cur = i + 1;
        found = true;


      } else {
        found = false;
      }

      if (found) {

        console.log('i am a script tag remove tat', body.childNodes[i]);
        body.removeChild(body.childNodes[i]);
      }

    }
  }

  public loadScript() {
    console.log('loadScript');

    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
        console.log('loadScript isFound', isFound);
      }
    }

    if (!isFound) {
      const dynamicScripts = [
        'assets/js/main.js',
        // 'assets/js/dev_dashboard_datatable.js'
      ];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        // node.charset = 'utf-8';

        document.getElementsByTagName('html')[0].appendChild(node);
      }

    }
  }

}
