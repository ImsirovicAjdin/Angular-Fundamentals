import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router} from '@angular/router'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl

  constructor(private router:Router, private authService:AuthService, 
    @Inject(TOASTR_TOKEN) private toastr: Toastr) {

  }

  ngOnInit() {
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      //this.router.navigate(['events'])
      this.toastr.success('Profile Saved');
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }
  
  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  cancel() {
    this.router.navigate(['events'])
  }
       
}
/*
11.05 Using Angular's @Inject Decorator (with an Opaque Token)
Now that we have the Toastr Service registered, we can use it here in our profile component. Normally when we want to inject a service, we do something like this, let's put these on separate lines, we'd add a new private and then for the Toastr Service, we'd call it Toastr and we would just give it a type. For example, Toastr, and that's all we would need to do, but since we're using an injection token, we actually have to use a slightly more complex method to inject this service. Let's go up, I've got to bring in, a couple of things. First I'm going to need the token and the Toastr interface. That's going to come out of our Toastr service, the token and the interface. One other thing that I need is going to be from Angular core, I'm going to need the inject object. Inject is a decorator just like component, that allows us to use a separate token besides the type of the construction parameter. So again, here for the AuthService, the token is right here, and that's also the TypeScript type. In our case, the TypeScript type is just the Toastr, which is our interface, but that is not our injection token. Instead, I'm going to add that decorator inject, and it's parameter as you can see is a token. I'm going to use the Toastr token here, and that tells Angular, for this Toastr variable, that we are creating, that is going to be a private member of this class. You're going to get your value by using the Toastr token to look up the service in the dependency injection registry. I'm still giving it type information, but that's simply for the Intelliscence here inside of this file, and that's all that's going to do. And now, with the service injected, I can go down to this save profile and instead of navigating, we're going to call this dot Toastr dot success and give it a message of profile saved. I'll see that change, and now let's go back to our webpage. We'll go to the all events and refresh, and we got logged out, so let's login. We'll go to the profile, and now let's make a change and click save, and there we get our Toastr popup telling us that the profile was saved. Of course, it disappears after its timeout. That's how you can use the Opaque Token to register dependencies and avoid difficulties of using things like strings for keys. There is homework for this clip, so you can go ahead and check that out now.
*/