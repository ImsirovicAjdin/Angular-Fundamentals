import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service'

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup

  constructor(private authService:AuthService) {}

  ngOnInit() {
    let firstname = new FormControl(this.authService.currentUser.firstName)
    let lastName = new FormControl(this.authService.currentUser.lastName)
    this.profileForm = new FormGroup({
      firstName: firstname,
      lastName: lastName

    })
  }

}