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
14.07 Using DELETE
We're now finished converting the event service to use HTTP. If we wanted, we could come in here and delete this whole EVENTS const. I won't bother with it, but you can if you want to. Let's move on to our next service to convert, which is the VoterService. We've got three methods here, deleteVoter, addVoter, and userHasVoted. Let's start off with addVoter, because that's going to be a post, which we're familiar with already. Let's leave that line in there, but instead, also add in our post. We're going to need the HTTP service, so let's create a constructor and we'll bring in a private HTTP of type HttpClient which we got from calling HTTP, and then after the push here on the session voters, we're going to call this. http. post. Our URL's going to be kind of long, so I'm going to create another variable just for that, and I want to do a little bit of string interpolation, so I'll use the back tick. It could be /api/events/ and then here we need the event ID, I'm going to interpolate that in. I don't have it yet, but I'll grab it in a minute. Then sessions, the session ID, again, I'll interpolate that in, and then voters, and then the voter's name. That's the URL that we need to use, and that's what we're going to post to whenever somebody actually votes for a session. So we can add that URL, we need a body, and in this case, because the URL actually has all the information in it, I'm just going to pass in an empty object as the body. Normally we would send some data up, but just posting to this URL actually causes the session we voted to, all the information is in the URL. The final thing we need is the options. Let's create the options. Again, that's an object with the headers property passing in an object that has a content type property which we will set to application/json. It does use the equal sign here, and then we can import the HttpHeaders, and we can pass in the options. We do want to catch any errors, so we'll pipe a call to catchError and import it, and we need another error handler, so let's go back to our events service and let's just copy the handleError method here. I'm going to put it after userHasVoted, we'll bring in the observable, and we'll call this. handleError, and the name of the method is addVoter. We're still missing our event ID so let's add that to the signature. We're going to pass in the event ID, we'll add that first, it's a number. And finally, since this addVoter method is going to get called, we're going to pass in the data, and we don't really care what comes back, I'm just going to make this post method subscribe to itself right here. Instead, we could have returned the observable and let whoever calls it subscribe to it, that way they can get notified when the call gets finished, but I know that in our case, that's not necessary where we call it. It's actually called in the session list, and if you look at where it's called, right here, we don't really care to be notified when it returns, so we're just going to have itself subscribe. So let's save that change and go back to the session list, we need to add the event ID. Now, the session list doesn't know about the event, which is where we get the event ID, but ID the session list is used on the event detail page. Right here in the HTML is where we use this session list, and this page actually does have the event, which has an ID. So if we just add a property called eventId, and we can bind that to the value of the event, which we want to be nullable, and its ID property. Save that change, we have to go back into the session list, and we need to add a new input parameter, and that's a number, and now down here, we call addVoter, we can just pass in that eventId. I bet it's this. eventId. And now we are correctly calling addVoter, passing in the proper eventId. Let's save that change, and that finishes up our addVoter method. Let's do deleteVoter now, deleteVoter's actually going to be easier than addVoter. We still want to update the client side, so we're going to keep that line of code in, but we're going to notify the server that we deleted the voter. So we call this. http. delete. Again, we want the same URL as we used before, so we want to grab that URL, paste it in, same URL, and of course, I want to catch any errors, so we'll add in the pipe. And finally, I'm going to also make this self subscribing because where it's called in the session list, which is right here, we don't really care to know when it finishes. So save this change and we need the eventId, so we're going to add that to the signature as well, and that is the eventId, which is a number, and back in here, we call it, we just pass in this. eventId, and that correctly calls deleteVoter with the correct parameters, and that's how you do a delete. Just like we did with post and put, we simply call the delete method that's on the HTTP object. In the case of delete, all we have to do is give it the URL. So let's just quickly head over to the browser, make sure we haven't broken anything. We're going to log in, and we'll go into this one and vote. We can see the vote is registering. Let's go ahead and look and see the network traffic. We want to unregister, and we can see here that we have made a delete call. There's our delete call to that URL, we gave it a delete vote. We're also getting a post. And that is how to implement the delete method.



*/