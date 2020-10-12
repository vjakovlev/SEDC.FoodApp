import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: any = ""

  formModel = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  })

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.router.navigateByUrl("/home")
    }
  } 

  onSubmit() {

    let model = {
      Username: this.formModel.value.UserName,
      Password: this.formModel.value.Password
    }

    this.userService.login(model).subscribe({
      next: res => {
        localStorage.setItem("token", res.token);
        this.authService.checkIfUserIsLogged()
        this.authService.checkIfUserUserIsAdmin()
        this.router.navigateByUrl("/home");
      },
      error: err => {
        this.message = err.error
        this.formModel.reset()
      },
      complete: () => {
        
      }
    })

  }



}
