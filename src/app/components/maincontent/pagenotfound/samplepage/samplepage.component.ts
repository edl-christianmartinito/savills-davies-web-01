import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../api/api.service';

// class employees {
//     id: number;
//     age: number;
//     name: string;
//     salary: number;
// }

class Person {
    id: number;
    firstName: string;
    lastName: string;
}

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: 'app-samplepage',
    templateUrl: './samplepage.component.html',
    styleUrls: ['./samplepage.component.scss']
})
export class SamplepageComponent implements OnInit {
    persons: Person[];
    dtOptions: DataTables.Settings = {};
    pageTitle = 'Sample';
    employees: Object;
    constructor(private apiService: ApiService, private http: HttpClient) { }

    ngOnInit() {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 7,
            deferRender: true,
            retrieve: true,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http.post<DataTablesResponse>(
                    'https://angular-datatables-demo-server.herokuapp.com/',
                    dataTablesParameters, {}
                ).subscribe(resp => {
                    that.persons = resp.data;
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }, { data: 'Actions' } ]
        };
        // this.apiService.getEmployee().subscribe((res) => {
        //     console.log('res', res[0]);
        //     this.employees = res;
        // });
    }

}
