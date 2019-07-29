import {Observable,BehaviorSubject} from 'rxjs/Rx'
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable()
export class HttpServiceHelper {

  constructor(private http: HttpClient) {
  }

  private loggedUserEmail = new BehaviorSubject('myemail');
  private messageSource = new BehaviorSubject('Unknown');
  private userData = new BehaviorSubject('');

  currentUserData = this.userData.asObservable();

  currentUserEmail = this.loggedUserEmail.asObservable();

  //currentMessage = this.messageSource.asObservable();

  // changeDisplayName(message: string) {

  //   this.messageSource.next(message)
  // }

  getLoggedUserEmail(loggedemail: string) {

    this.loggedUserEmail.next(loggedemail)
  }

  getUserData(userdata:any) {
    
    this.userData.next(userdata)
   
  }



  public httpGetRequest(url : string) {
    return this.http.get(url)
      .map(response => {
        return response;
      })
      .catch(response => (Observable.throw(response)
      ))
  }

}
