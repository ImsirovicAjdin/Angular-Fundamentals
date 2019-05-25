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
14.09 Persisting Authentication Status Across Page Refreshes
You've got authentication happening on the server now, but unfortunately, our client is not persisting login information across page refreshes. If I refresh, the client thinks I'm no longer logged in, and it wants me to login again, but the server actually does, the server's tracking that, and on the server, I'm still authenticated. So let's change our client so that it asks the server for the current authentication status whenever the user refreshes the page. Now there's a lot of different ways to do this and how you do it may depend somewhat on your server. We're going to go with the simple method for our application. Back in the code, what I need is a way to check the authentication status of the current user. Are they logged in or are they not? A reasonable place to do that is in our app components as that's sort of the core of the entire application. Let's open up the app components, which is events-app. components. ts. And here we've got a simple template and no actual code. We've got this title property that isn't being used anymore and let's delete that, and what I want to do is get ahold of the authentication status for the current user. Anything that I do with authentication should go through that auth service, that's the logical place to put this type of code. So let's inject the auth service here in our events app component. We'll create a constructor and we'll inject the auth service and of course, import that as well. And now that we have the auth service, we can check the login status of the current user when the application is initialized. And we'll do that in the init event for this route app component. So I'll add ngOnInit, and inside of here, I'm going to call this. auth, and now I need a method that checks the authentication status. I don't have one currently on my auth service, so we're going to create a new one. Let's name this checkAuthenticationStatus, and all that will do is check the current authentication status whenever the application is initialized, which is one of the things that happens when we do a hard refresh in the browser, and let's create this method now in our auth service, saving that change, going to the auth service. After isAuthenticated, let's add that checkAuthenticationStatus method. And we need to make another HTTP call, so we'll call this. http, and in this case, I've got an endpoint setup that is at the URL /api/currentIdentity, and this returns no value if the user's not logged in, but if the user is logged in, then it returns their current identity as an object. And that's a get request that that endpoint is set up for, and when that method returns back, I want to check the data that gets returned back and do something if the data is of a certain type. So there's a couple of ways to do this, and this code right here doesn't need to do anything when the call returns. Instead, it's more about setting the current user here. We could just subscribe, and then with the data that comes back, we can determine what to do. Another way to do this is to actually use that same tap method we used previously so that we can take an action that is a side effect. So let's look at both of those implementations. The first one will just subscribe, we get back some data in the subscribe, and we know that it's going to be null if the user is not logged in, or an object, a user object if they are. We can just call if data is an instance of an object, then we can set the current user. And we set it to that data property, but it does of course an IUser, let's cast it. This is one way to handle this. Another way we can do this is basically the same thing, but using tap. So we pipe and then call tap. And of course, we need to import tap, and we'll grab all that code we wrote into subscribe and cut it out, and paste it up here, and close this up. These two methods for dealing with return data function exactly the same. One benefit of doing it this way where we do it inside of the tap method instead of doing it inside of the subscribe is that later on if we want to actually return the observable and let the consumers of the checkAuthenticationStatus actually subscribe and take an action based on when the data comes back, we can simply just delete this line and do a return, and of course, go everywhere that checkAuthenticationStatus is called and call subscribe, and that way, they get the same data, they get access to that user data that we have access to here in the tap, but these consumers can actually take an action and deal with the correct data. There isn't really a right or wrong answer in this case, I just personally like this better because I like how this call looks a lot better than how it looks when we add the subscribe. So I'm going to save that code without the call to subscribe back into this code here. I'm going to take out the return call, and then save this call as well. As is often the case with programming, there's several ways to accomplish something, and it's oftentimes a very subjective call to determine which way it should be done. So let's now go back to the browser and refresh. After we go to events, it doesn't make any sense being logged in if we are authenticated. And notice that we're seeing that we are authenticated. So now the client is getting the authentication setting from the server.



*/