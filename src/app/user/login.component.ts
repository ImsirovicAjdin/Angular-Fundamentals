import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent {
  username
  password
  mouseoverLogin

  constructor(private router:Router, private authService:AuthService) {

  }

  login(formValues) {
    // this.router.navigate(['events'])
    // console.log(formValues)
    this.authService.loginUser(formValues.userName, formValues.password)
  }

  cancel() {
    this.router.navigate(['events'])
  }
}