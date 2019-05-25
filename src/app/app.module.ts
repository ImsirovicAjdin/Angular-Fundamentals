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
14.05 Using POST and PUT
You've now converted getEvents and getEvent to use HTTP. Next, we're going to do our saveEvent method. Now, saveEvent's going to be different because we need to send data to the server, which means we need to make a post request instead of a get request. So let's come on down here to our saveEvent, and we are going to get rid of its implementation, and since we're making a post, let's just check out what post looks like. Call this. http. post, and let's look at the parameters. Notice the first three parameters. The first is the URL, just like with get, but then we have a body parameter, and then third, an options parameter. Those parameters are all required. The body is the data we're sending up, but the options allows us to do things like set our HTTP headers, which can tell the server what kind of data we're sending up. That's exactly what we need to do here, we need to tell the server that we're sending up JSON data. So let's create an options variable. That's going to be an object that has a headers property. And that headers property is going to be a new HttpHeaders. And let's import that. That just imports from that same common HTTP. Inside of here, we pass in an object where we can specify any headers we need to set. We only need to set one of the content type, and that property is going to be set to the string application/json, and that tells the server we are sending up JSON data. Now in the post call, we need to set the type of data that's going to be returned by the post, and not in every case do you care what comes back from the post call, but sometimes you do. If we're going to create a new event, we might want to get an updated copy of that event from the server because the server might for example set the ID of the event, and that actually happens in our case. So we're going to give it a type of IEvent, and inside of our call, we're going to be using the URL of /api, of course, /events, and because it's a post method, the server knows that we're creating an event, then we need pass in the body that we're going to send to the server. In our case, we're just going to pass in that event. And finally, we're going to set our options. This is of course an observable, and we want to catch any errors, so we'll go up here and grab the catchError method. And we can use the same exact one, except instead of getEvents, we're going to set this to saveEvent. And notice we missed something in the last section, getEvents should here be just getEvent. So there's our call to http. post, we want to return that observable. That way whoever calls the saveEvent method can then subscribe to the observable. Let's save those changes, and we'll head over to the create event component, and here is where we call the saveEvent method. And right down here where we call saveEvent, this is now an observable that we need to subscribe to. And it does return the event from the server, but we don't really care what's coming back, we just want to know that the call has been successfully made. So once that call returns, we're going to set our dirty flag and navigate a way to events, but we won't actually do anything with any data that's returned from the server. So let's save these changes and we'll go out to the browser and we are going to create a new event. Let's open the console just so we can watch for any errors. And let's make that as small as possible. Go to the create event page, and we'll call this ngAntarctica, and that will be held on January 1st, 2040. It will start at 9:00 a. m.. The price will be 500. The address is 123 South Pole Circle at the South Pole, country is Antarctica, and we don't really have an image to use, so just use /Antarctica. jpg, which is going to return a 404, which is fine. And let's save that event, and here we go, we've got our Antarctica. We didn't get any errors on the console. We did get a 404 out of that image, but that's fine, that's not anything we weren't expecting. And if we click into it, we can see the data that it's got. Now before we finish up and go back to our code, we're going to look at the next method, which is the updateEvent method. Normally when you update an object using a RESTful server, you would make me put call instead of a post call, but in our application, the only time we're updating an event is when we are adding new sessions to an event. So the server that we've created has actually got a smart endpoint, the /api/events endpoint, notice that if you send up an event that actually has an ID, then you want to do an update. If you send up an event that doesn't have an ID, then it knows you want to create that event. So in our case, we don't actually even need the updateEvent method because the saveEvent will do both things and serve both purposes. We're going to delete this, but we will talk about the format of the put method. If we did need to make a put request, an HTTP put request, we can change post to put, and the signature's actually identical to the post request. Takes the same exact parameters, the URL, the body and the options. We'll leave ours as a post, but now we need to go into where we call the updateEvent method. Let's save that change first, and we make that updateEvent call inside the event details component. It's right down here, is where we call updateEvent. So instead of calling updateEvent, we're going to change this to be saveEvent, and since this is an observable, we need to subscribe to it, but in our case, we don't care about the return data, we're not doing anything about that. We could listen to the subscribe and make a callback that sets the addNode to false inside of the callback of the subscribe, but in our case, we're going to be a little bit more optimistic and just leave it there, so we just have an empty call to subscribe. So now we can save that change, and we will now be both creating and updating events on our server.

*/