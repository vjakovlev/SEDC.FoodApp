import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {

  isLoggedIn: boolean 
  isUserAdmin: boolean

  constructor(private router: Router,
              public authService: AuthService) { }
   
  ngDoCheck(): void {
    if(!!localStorage.getItem("token")) {
      this.authService.isLoggedIn.subscribe({
        next: data => this.isLoggedIn = data
      })
  
      this.authService.isAdmin.subscribe({
        next: data => this.isUserAdmin = data
      })
  
      this.authService.checkIfUserIsLogged()
      this.authService.checkIfUserUserIsAdmin()
    }   
  }

  onLogout() {
    this.authService.logout()
  }

}
