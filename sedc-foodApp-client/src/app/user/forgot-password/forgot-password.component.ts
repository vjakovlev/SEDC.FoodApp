import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  formModel = new FormGroup({
    EmailAddress: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  onSubmit() {

    let model = {
      Email: this.formModel.value.EmailAddress
    }

    this.userService.forgotUserPassword(model).subscribe({
      next: res => console.log(res),
      error: err => console.warn(err)
    })

  }

}
