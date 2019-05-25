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
14.06 Using QueryString Parameters
The last method that we need to convert is our searchSessions method. Now the nice thing about this conversion is that all of this code here in the searchSessions method is going to go away because the searching itself is going to be done on the server, we just need to make a call. So let's go back up to one of our getEvents here, and we are going to paste in that code and replace the entire set of code of searchSessions, but of course, we need to make a few changes. What's different about searchSessions is we actually use a query string, which is thankfully extremely easy. Let's change our URL, instead of api/events, it's going to be the api/sessions/search? search= and then we'll append in our search term. That's where we'll use a query string in the URL, we do need to change this return type, it's no longer an IEvent, it's actually an array of ISessions. We still want to catch the error, but again, it's not an IEvent, it's an array of ISessions. And it's not getEvent, it's searchSessions. And we can go up and add in a return type, which is an observable of my session array. And we'll save those changes. And since we actually haven't changed the signature, we really don't need to worry about going to wherever it's called and updating that. We're still returning out the same exact thing, which is an observable of an array of ISessions. If we just check out where it's being called, which is in the navbar, down here in searchSessions, we can see that this is exactly right, we're calling searchSessions and we're subscribing to it and setting the foundSessions equal to the return value. We are logging out the foundSessions, we probably don't need that, we could take that line of code out. We'll save that and go back to the browser and it's already refreshed for us, but let's go ahead and search and make sure that our search is still working, and it is. So using query strings is extremely simple in Angular. There's a practice exercise for this clip, if you want to do that now.

*/