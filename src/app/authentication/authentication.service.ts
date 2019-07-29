import {Observable} from 'rxjs/Rx'
import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public httpGetRequest(url : string) {
    return this.http.get(url)
      .map(response => {
        return response;
      })
      .catch(response => (Observable.throw(response)
      ))
  }
}
