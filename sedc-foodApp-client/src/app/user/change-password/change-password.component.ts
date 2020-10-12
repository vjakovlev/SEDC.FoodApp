import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  message: any = ""
  messageColor: any = "danger"

  formModel = new FormGroup({
    CurrentPassword: new FormControl('', Validators.required),
    NewPassword: new FormControl('', Validators.required),
  })

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {}

  onSubmit() {

    let model = {
      CurrentPassword: this.formModel.value.CurrentPassword,
      NewPassword: this.formModel.value.NewPassword
    }

    this.userService.changeUserPassword(model).subscribe({
      next: res => {
        this.messageColor = "white"
        this.message = res.message
        this.formModel.reset()
      },
      error: err => {
        this.messageColor = "danger"
        this.message = err.error
        this.formModel.reset()
      }
    }) 

  }

}
