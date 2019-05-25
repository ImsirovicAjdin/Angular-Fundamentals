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
14.04 Listening to resolved data changes

Listening to Resolved Data Changes
We've got getEvents converted to use HTTP, let's now convert out next method, which is getEvent down here. Now I don't want the handleError method to be right in the middle, I'm going to move that to the very bottom, so I'm going to cut that out, and on the very bottom after searchSessions and put the handleError call there, and now getEvent. The getEvent has a problem because the signature's wrong, right now it's just returning IEvent directly, rather than an observable. So let's start by changing the signature. The signature will now be an observable of IEvent. And of course, this code no longer works. Instead, let's go ahead and just copy this code right here, but we don't want to be returning an array of events, it's just a single IEvent, and when we catch the error, we no longer want to get a default array. But at this point, we're calling to the same endpoint, which is api/events, which is going to just return a list of every event, we only want a single specific event, so we're going to add on to this URL the ID that, of the event, which is the parameter that we receive in, so we can just add on id, and that's going to make a call to /api/events/ and the id number of the event, and we're going to return single event from that HTTP call. Now we need to go out to where this call is being made which is in the event details component. And down here in the ngOnInit is where that's being called. And we can see that we're getting an error. We no longer can handle this code this way. Instead, we need to call the getEvent method and we need to subscribe to, we talked about this in the last section, this HTTP call will not actually get executed unless we subscribe, so let's subscribe. We're going to pass in a function. The function is going to take in the value that comes back which is a single event, which is of type IEvent, and inside that function, it will handle the results of the getEvent call. So we want to set this. event equal to the event, and of course, we set addNode to false here in the ngOnInit. You probably only want to do that if the call is successful, so let's move this inside of our subscribe call. And that's all we've got to do, if we save this change and go back out to the browser, we can click on a specific event, and this is the data from that event that's actually coming an HTTP call. But we have a problem and that is that this event details page is actually being guarded by an activation guard. If we look at the event route activator service, this service calls the eventService. getEvent and checks to see if the event actually exists. Now that call no longer works because it's returning out an observable and not an actual event, so this guard is no longer valid. So let's switch this up a little bit, let's no longer guard the route. Instead, let's create a resolver on this data, and we'll resolve the data before we actually hit the page and we won't even guard this route anymore. So let's start by deleting this file. I'm going to send this over to recycling bin, and let's create a new resolver. Down here right next to the events list resolver, we're going to create another resolver, which will just be our event resolver. We'll name it event-resolver. service. ts, and let's just go into the events list resolver, and copy this code and we'll use it as a template. Now of course, we want to change the name, we no longer want to call this the EventListResolver, we're going to call this EventResolver, and we're no longer calling getEvents, we're going to call getEvent instead, but that takes in a parameter, and that parameter is the ID that we want. In order to get the ID that's being accessed when we have a resolver on a route that has a route parameter, we will get ahold of the activated route snapshot. So here in our resolve method, we can actually pass in an activated route snapshot. We'll call it route, and the type is ActivatedRouteSnapshot. Notice that's being imported on line two. And then within the call, we can call that route snapshot. It has a params property, and that params property, we can access the ID property of that, we'll use the array access instead of the. access. And we'll access it like this because the params type doesn't know what the name is. We can name a route parameter anything that we want. We named it ID in the route. If we go into the route and we look at the events ID route, we have named that parameter ID, so that creates a property on the params object. We normally would access it as. id because that is the name of the property, but that type doesn't know about it. We could also have named this Joe, in which case, we change this name here to Joe, but we did name it far more appropriately ID, so we'll keep those two things as just ID. So let's save that change, and we need to add this resolver to our index. We'll save that change. And now I need to add that resolver to the modules, so let's go into the app module, and we'll go down to the providers, and we no longer want the EventRouteActivator, this doesn't even exist anymore. If we were to scroll up to the very top, we'll see there's an error, because that doesn't exist, so we'll take that out, and instead down here, through the EventRouteActivator, we're going to use our EventResolver, and we will import that and save that change. And finally, back to the routes file, we were using this EventRouteActivator which no longer exists, we'll cut that out, and we'll change this canActivate to just resolve because we are going to be just doing a resolve instead of an activate guard, and this will be our EventResolver, and we'll import that. And of course, save that change. And now back to our event details component. This is where we need to get ahold of the event that is now being resolved, and essentially, it gets loaded before this component actually gets executed. So we need to get ahold of that data from the resolver, and we have a pattern that's already doing that. In our events-list component, we're doing that same exact thing right here in the ngOnInit, so let's grab that line of code, and inside of this forEach method, instead of calling subscribe, and want to set the event equal to the call to the snapshot data, and we'll delete that, and it's not called events, it's called event. And we can find that name by going into the routes. And this is where we set the name. We didn't set our name correctly, we just listed the resolver, we actually need to follow the pattern that's given right up here. So we change this array to be an object, and we name it event, and we fix that back into our event details component. We now have an extra closing curly brace, let's fix this indentation and this extra line. So let's save that page, we'll go back to the browser. No such file or directory event-route. activator. service. So we got a problem, it's in the event details index, it's still referring to that activator service we deleted. So let's go into that event details index file. It's right here, we're still referencing it. We'll cut it out and save. Go back to browser, and there we go, it is selecting the data for that one event and populating our browser. If we check the console, look for any errors, we're not getting any errors, but before we finish up, let's go back and we're going to clean up one small issue in our code here, our event details. Notice that we're actually subscribing to the params object. The activated route snapshot has a list of parameters. It also has a list of all the data that's been resolved. So we can simplify our code quite a bit by changing this from params to just be data, and the value that's received, we'll just name it data. And now we access data as a property not of the snapshot, but of the callback that's being passed into the forEach function. So that's cleaned up our code a little bit, we'll save that, and there we go, we're now listening to resolved data changes. If we look in our browser, and we are on the Angular Connect event, we do a search and scroll down and do something else, it's routing to the correct event.



*/