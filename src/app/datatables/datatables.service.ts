import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType,HttpResponse  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatablesService {

      //  SERVER_URL: string = "https://savillsvmsapi.azurewebsites.net/api"; // STAGING IAT
      // SERVER_URL: string = "http://savillsvmsapidev.azurewebsites.net/api"; // DEV
      // SERVER_URL: string = "https://localhost:44306/api";
      // SERVER_URL: string = "https://savillsuatvmsapp.azurewebsites.net/api"; // UAT savills server
      SERVER_URL: string = "https://savillsvmslocalhost.azurewebsites.net/api"; // LOCALHOST
        

  constructor(private httpClient: HttpClient) { }



  public dtAllusers(data) {

    const formData = new FormData();
    
     formData.append('data', JSON.stringify(data));
      
    const urlUsed = `${this.SERVER_URL}/getData/loadallusers`;
    return this.httpClient.post<any>(urlUsed,data);
  }

  public dtProperties(data) {

    const formData = new FormData();
    
     formData.append('data', JSON.stringify(data));
      
    const urlUsed = `${this.SERVER_URL}/properties/loadallproperties`;
    return this.httpClient.post<any>(urlUsed,data);
  }

}








