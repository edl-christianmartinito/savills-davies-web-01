import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-others',
  templateUrl: './new-others.component.html',
  styleUrls: ['./new-others.component.scss']
})
export class NewOthersComponent implements OnInit {
  pageTitle = 'Others';
  loadAPI: Promise<any>;
  constructor() { }

  ngOnInit() {
    this.loadScript();
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
