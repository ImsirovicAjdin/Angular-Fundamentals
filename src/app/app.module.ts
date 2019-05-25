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
14.10 Saving User Data to the Server
Another feature of our application is to update the current user. We have the ability on the profile page to change the user's first and last name. This method in the auth service, the updateCurrentUser implements that functionality. Right now, it's only persisting to the client, we want to persist that change to the server. Again, the server itself is already set up to handle this functionality through a URL of /api/users/ then the current ID of the user, and if we would do a put to that URL, we will update the user that corresponds to a given ID, say, three or four. So let's implement that. We do need to set the content type and then come up here and grab this options, and just paste it in down here. Then we can call this. http. put, setting the URL. And we want to include the ID of the current user. Let's use string interpolation here. And we'll get this. currentUser. id to interpolate in the user's ID. And the body that we want to send up is going to be the current user. We've updated the current user here, so the current user has now got the correct value, so we can just send up this. currentUser. And I know that the endpoint expects an object that looks just like my current user looks like on the client, so I don't need to format it in any way, I could just send up the actual current user object, and the third parameter of course is the options. So we're now issuing our put, but let's look at how this is called. It's called in the profile component, and it's called right here, and after the current user's updated, we call toastr. success to give the user a message that the profile has been saved. I would like this toastr message to happen only once the server returns back and says that the user has been saved. So let's go back into our auth service and let's return this observable, and then here in our saveProfile, we can call subscribe, and we'll do an empty return function, or we can call the toastr. success, and that will let us only show the toastr once the user has been updated on the server. So I'll save my changes here, and back to the auth service, we'll save our changes there as well. And let's go back to the browser. I'm going to refresh just to make sure we have the current code. Let's go over to the profile. Let's change John to Johnny, and we'll save. We did get the message that the profile has been saved, but we don't know if it's persisted the server for sure unless we refresh and see if the values are still the same after cutting a round trip from the server. So if we refresh, and our first name is still Johnny, so the server has persisted that data change. We're going to set it back to John and update the server. And there, we have successfully updated the server with the user data whenever it gets changed.

*/