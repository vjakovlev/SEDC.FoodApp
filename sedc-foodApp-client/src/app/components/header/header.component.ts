import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any

  constructor(private router: Router,
              private userService: UserService) { }

  //need to be checked             
  ngOnInit(): void {
    console.log("from nav")
    this.userService.getUserProfile().subscribe({
      next: res => {
        console.log(res, "<=====")
        this.userDetails = res
      },
      error: err => console.warn(err),
      complete: () => this.checkIfUserHasAdminRole()
    })
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/user/login"]);
  }

  checkIfUserHasAdminRole() {
    if(this.userDetails.role.includes("ADMIN")) {
      return true
    } else {
      return false 
    }
  }

  test() {
    console.log(this.userDetails)
  }

}
