import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType,HttpResponse  } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

        // SERVER_URL: string = "https://savillsvmsapi.azurewebsites.net/api"; // STAGING IAT
        // SERVER_URL: string = "http://savillsvmsapidev.azurewebsites.net/api"; // DEV
        //SERVER_URL: string = "https://localhost:44306/api"; // LOCAL
        // SERVER_URL: string = "https://savillsuatvmsapp.azurewebsites.net/api"; // UAT savills server
        SERVER_URL: string = "https://savillsvmslocalhost.azurewebsites.net/api";
        
    

    constructor(private httpClient: HttpClient) { }

    public getUserData(data) {

        const urlUsed = `${this.SERVER_URL}/getData`;
        return this.httpClient.post<any>(urlUsed, data);
    }

    public saveUserPersonalDetails(data) {
        const urlUsed = `${this.SERVER_URL}/users`;
        return this.httpClient.post<any>(urlUsed, data);
    }

    // public getDataUser(data) {
    //     const urlUsed = `${this.SERVER_URL}/users/`+data;
    //     return this.httpClient.get<any>(urlUsed);
    // }

    public getOfficesRoles() {
        const urlUsed = `${this.SERVER_URL}/getData/officesroles`;
        return this.httpClient.get<any>(urlUsed);
    }

    public updateUser(data) {
        const urlUsed = `${this.SERVER_URL}/users/updateusers`;
        return this.httpClient.post<any>(urlUsed,data);
    }

 
    public getIndicationsReqData(data) {

        const urlUsed = `${this.SERVER_URL}/Indications/loadIndicationReqData`;
        return this.httpClient.post<any>(urlUsed,data);
    }

  
    public getCurrency(basecurrency) {
       
        return this.httpClient.get<any>('https://api.exchangeratesapi.io/latest?base='+basecurrency);
    }

    public createProperty(data) {
       
        const urlUsed = `${this.SERVER_URL}/Properties`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public getProperty(data) {
       
        const urlUsed = `${this.SERVER_URL}/Properties/getproperty`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public updateProperty(data) {
        const urlUsed = `${this.SERVER_URL}/Properties/updateproperty`;
        return this.httpClient.post<any>(urlUsed,data);
    }
    
    public deleteProperty(data) {
        const urlUsed = `${this.SERVER_URL}/Properties/`+data;
        return this.httpClient.delete<any>(urlUsed);
    }

    public createIndication(data) {
        const urlUsed = `${this.SERVER_URL}/Indications/saveindication`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public updateSuperUser(data) {
        const urlUsed = `${this.SERVER_URL}/users/updatesuperuser`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public createIndicationProperties(data) {
        const urlUsed = `${this.SERVER_URL}/IndicationProperties`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public createCompany(data) {
        const urlUsed = `${this.SERVER_URL}/Companies`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public createClient(data) {
        const urlUsed = `${this.SERVER_URL}/CompaniesClients`;
        return this.httpClient.post<any>(urlUsed,data);
    }

    public searchIndication(data) {
        const urlUsed = `${this.SERVER_URL}/Indications/searchIndication`;
        return this.httpClient.post<any>(urlUsed,data);
    }
    
}
