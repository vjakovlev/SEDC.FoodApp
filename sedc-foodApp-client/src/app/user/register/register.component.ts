import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false

  constructor(public userService: UserService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.router.navigateByUrl("/home")
    }
  }

  formModel = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    FullName: new FormControl('', Validators.required),
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  })

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  onSubmit() {

    let body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password,
    }
    
    this.isLoading = true;
    this.userService.register(body).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err),
      complete: () => {
        this.isLoading = false
        this.router.navigateByUrl("/user/login");
      }
    })

  }

}
