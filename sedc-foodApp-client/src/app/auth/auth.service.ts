import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {}

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public isAdmin = new BehaviorSubject<boolean>(false);

  checkIfUserIsLogged() {
    if(localStorage.getItem("token") != null) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  checkIfUserUserIsAdmin() {
    if(this.isLoggedIn) {
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;

      if(userRole === "ADMIN") {
        this.isAdmin.next(true);
      } else {
        this.isAdmin.next(false);
      }
    }
  }

  checkUsername() {
    if(this.isLoggedIn) {
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      return payLoad.UserName;
    }
  }

  getUserId() {
    if(this.isLoggedIn) {
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      return payLoad.UserId;
    }
  }

  logout() {
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    localStorage.removeItem("token");
    this.router.navigate(["/user/login"]);
  }


}
