import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL = environment.apiServer
  userDetails: any

  constructor(private http: HttpClient) {}

  register(body) : Observable<any> {   
    let url = `${this.serverURL}/api/applicationuser/register`
    return this.http.post(url, body);
  }

  login(body) : Observable<Token> {
    let url = `${this.serverURL}/api/applicationuser/login`
    return this.http.post<Token>(url, body);
  }

  getUserProfile() {
    let url = `${this.serverURL}/api/UserProfile`
    return this.http.get(url);
  }

  changeUserPassword(body: any) {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userId = payLoad.UserId
    body.UserId = userId

    let url = `${this.serverURL}/api/applicationuser/ChangePassword`

    return this.http.post<any>(url, body);
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  
}

export interface Token {
  token: string
}
