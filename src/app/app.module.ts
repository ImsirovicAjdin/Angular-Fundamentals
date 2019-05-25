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
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  DurationPipe,
  VoterService,
  LocationValidator
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
    { provide: EventRouteActivator, useClass: EventRouteActivator },
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
14.03 Moving Data Storage to the Server
And we're going to start with our events service. Let's open that up, event. service, and this class right here is providing access to our events, for example, the getEvents method right here. This accesses our events. And if we scroll down, it's this local events data right here that we're actually accessing. We no longer want to access this local events data, we want to access the events data that is held on our server. We want to access it through that new little web server that we installed. So this class now has to utilize HTTP. We start off by adding the HttpClient, we'll do that with a constructor, and I'm going to create a private variable. I named it http, and the type is going be HttpClient. Let's import that, again, from the Angular common HTTP library, and we'll start by converting our getEvents method, so we can take all of this code right here and just get rid of it. We like the signature, the signature's good because it's an observable IEvent, but we no longer want to grab it from this local array that's just here in this file. Instead, we want to talk to the server. So we're going to return this. http, and the HTTP class, that HttpClient class has a method for every type of HTTP interaction we can do. We're gathering data, so we want to make an HTTP get request so we will call. get, and that method will make a get request. This is a typed method where we tell it what it's going to be returning out, and it's going to be returning out again that IEvent array, and it takes in a set of parameters. The only primary that we really need is the URL. So our URL to request the events is just /api/events. Notice how we're starting with /api, in our proxy config file, we told our server that any request that come to a /api/anything are going to actually get forwarded on to that new server that we got running on port 8808, so we got to make sure that any new URLs that we use start with /api, and correspondingly, that little server we set up so that if any requests come from /api/events, it's a get request, it's going to return a collection of every event that is in the server's data set. Now at this point, I'm getting my data, and it's going to be typed correctly and everything is fine, but what happens if I have an error? I want to handle errors. So I'm going to create a private method called handleError, and that has a type of just T, it's a generic type, and the operation is going to default it to a string operation, and it has a second parameter, which is a result, which is an optional parameter, which will be that same type T that is the type parameter. And from within here I'm going to return an observable of T a function that takes in one parameter error, which is of type any, and that function returns an observable of that same T type, whatever that type is. And that function is going to call console. error, so it's going to report out to the console that there was an error and we're just going to report out that same error object, and then we're going to return an observable of the result cast as a T. This is some kind of deep typing with the signatures and stuff using the generic type of T. Really digging in and understanding all of this is a little bit beyond the scope of this course because this course is not specifically about RxJS or about typescript, but this gives us a nice template for just basic error handling, and anything you want to do to handle the errors, we can just do right here. So if you want to just copy and utilize this code as is but you want to customize it a little bit, you just need to add a little bit more code here where we have the console. error. Maybe you want to log out to a database or to an actual error logging system, whatever it is, you can customize it there, but this code can pretty much just be copied and pasted. As you get more into RxJS and more into typescript, you can learn how to deal with this code and do specific things that might work better for your situation. But for now, this code is going to be a nice template that we can just utilize to handle basic errors, and to utilize the error handling with RxJS, we're going to pipe this get method. So if I typed in a period here, we can see the pipe is another method on what's getting returned. So I'm going to put it on a new line so we can have a little bit more visually clean code. We'll call pipe, we're going to call a special RxJS method called catchError, and catchError is going to be imported, we're going to import that from rxjs/operators, and that's a method where we pass in that handleError method that we created. And that method has a type parameter which we're going to set to IEvent array, because that is the return type of this getEvents method. And then when I call it, the first parameter it wants is an operation, and that's a string, and that's just the name of the method. This is for error reporting purposes. So I'm going to pass in the same getEvents, that's the name of this method, so if this method has an error during the HTTP call, when the error is reported, the word getEvents will get reported out, and I can pass in a default result, so I can pass in just an empty array. And now with that, we're calling the get method, and we're handling any errors with a very basic operation just logging out to the console. So let's save that change, and now if we look to see where this getEvents is called from, we're going to find that it's in the EventListResolver. And it's right here, that's where we call getEvents, and notice this map call is just mapping events to itself, we can actually get rid of that, so let's delete that map call, and this is a resolve function, and we need to note something here. A resolver automatically subscribes to an observable call that it gets, so getEvents, if we go back to our event service, notice the return type is an observable. Angular has built-in functionality that in a resolver, any observable that it gets, it will subscribe to itself, we don't have to make a subscribe call, but if we were making a getEvents call ourself somewhere else like just in a component or another service, we would need to subscribe to this observable with a call to. subscribe. The reason we need to do that is with HTTP observables, the HTTP request does not get made until somebody subscribes to that observable. So if nobody ever subscribes, that HTTP call will not happen and that is a common gotcha that can with RxJS is you create an observable, you return it from a method, and so then when you call that method, you might assume, "Hey, this observable is going to happen "because it's a call to get on the HttpClient. " But that HTTP call will not execute until somebody subscribes to the observable. Again, we don't have to do that here, that's done automatically, so I'll delete that code. We'll save that here, and now we can go back out to the browser, the CLI has already refreshed the page for us, but let's go to the network tab and let's refresh it again, and we're going to look at just XHR requests, and notice we've now got this call to /api/events. Let's open this up just a little bit here and we will zoom in a tad, and look at the response, let's do the preview. We can actually see that we're getting back event data. This is what the server is returning to us whenever we call /api/events. This is the data that's getting returned and our client is now grabbing that data, and that's the data it is getting displayed here in our page it's these five pieces of data. If we had different events coming back from the server, then we would be displaying different data. And now we created our first HTTP call using RxJS and Angular's HttpClient. There are practice exercises for this clip if you want to take a moment and do those now.
*/