import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  register(body) : Observable<any> {   
    return this.http.post("https://localhost:5001/api/applicationuser/register", body);
  }

  login(body) : Observable<Token> {
    return this.http.post<Token>("https://localhost:5001/api/applicationuser/login", body);
  }

  getUserProfile() {
    return this.http.get("https://localhost:5001/api/UserProfile");
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
