import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  DurationPipe,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/nav-bar.component'
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent } from './common/index'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'
import { ModalTriggerDirective } from './common/modalTrigger.directive';

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
    EventService, 
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,
    EventListResolver,
    VoterService,
    AuthService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}

export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}
/*
14.11 Implementing Logout
There is one more piece of functionality that doesn't even exist yet in our application, and that is giving the user the ability to log out. Right now, there's no logout functionality anywhere in the application. So let's add that, we'll start with our UI first. And it's in our profile component, we're going to add a logout button. So we'll go to the HTML of the profile component. And way down here on here at the bottom, after this cancel button, we want to add a new button for logging out. Now I want to change this a little bit, I don't want this to be a default look, I want this to be a warning look, and I'd like it to be visually separate just a little bit, so I'm going to float that to the right. That'll separate it out some from the cancel and save buttons. Of course, you don't want to call cancel, let's call logout, and finally, the text should be logout. Save that change and go into the profile component and let's implement our logout function. Let's just come right after save profile and create logout. And the actual functionality of logging out a user should be inside of the auth service. So we'll call this. authService. logout, but we want to know when the user has been logged out successfully on the server, because then we want to redirect the user to the login page. Keeping them on the profile page doesn't make any sense at all once they've been logged out. So let's make this an observable that we can subscribe to, and once they have successfully logged out, we'll call this. router. navigate, and we will navigate to /user/login, which is the login page. Now of course, we're getting the red squiggly underneath logout, because that function doesn't exist yet in the auth service, so let's save our change here and go to the auth service, and we will create a logout function. Now this is going to be an HTTP request, let's set the content type to application/json, and remember, we're subscribing to that in the profile component, so this needs to return an observable. And in our case, I've already got an endpoint set up on the server, which is /api/logout, and have to post that, so we'll call post, /api/logout, and a post needs a body, but it doesn't make any sense to have any data in the body, so we're just going to pass in an empty object. And then finally our options to set the content type correctly. Now again, this course is not about server design, about RESTful API endpoints, or anything like that, though you are seeing some choices that we have made when we created the server. For example, to logout, you need to create a post request to /api/logout, which logs out the current user. We could have made that a put or a get, but in our case, we made it a post. A post requires a body, and we're just passing in an empty object. We could have passed the current user across the wire, but we really want the server to just figure out who the current user is and log that person out rather than worrying about like a user ID that we send across the wire. So these are some choices that are made that you might decide how you want this server to look and it might look a lot different than the server that we created. It's beyond the scope of this course. It's just important to know that when you are interacting with your server on a client, you need to know what your API endpoints look like, what methods they require, what the URLs are, and what data they accept and return. Finally, to implement logout, we have now logged out the user on the server, but we haven't logged them out on the client. To log them out on the client, all we have to do is set the current user equal to the value of undefined. And now the client will know that the user has logged out. So let's save that change, and we'll go back to the browser, and we now see the logout button. Let's click that, we've been logged out. If we go to events, and even if we refresh, note that we are logged out, we have to log in, if we want to have any login functionality. We have now finished all the functionality for our application, with one small exception. This events dropdown was actually meant to show a list of every event that exists on the server, but right now, it's just hard-coded to show one event. So this is a little bit of homework you could do on your own. You can wire up this dropdown to list every event so that users have quick and easy access to a specific event. We're not going to show you how that's done, we'll leave it up to you, but with what you've learned so far in this course, you certainly have all the tools you need in order to implement that functionality.

*/