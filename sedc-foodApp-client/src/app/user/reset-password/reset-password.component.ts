import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userEmail: string
  token: string

  formModel = new FormGroup({
    Password: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.userEmail = params.email,
        this.token = params.token
      }
    })
  }

  onSubmit() {

    let model = {
      NewPassword : this.formModel.value.Password,
      Email : this.userEmail,
      Token : this.token
    }

    this.userService.resetPassword(model).subscribe({
      next: res => console.log(res),
      error: err => console.warn(err)
    })

  } 

}
