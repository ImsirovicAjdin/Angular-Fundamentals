import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    RouterModule.forRoot(appRoutes)
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

14 Communicating with the server using http, observables, and Rx
14.01 Introduction
In this module, we're going to learn all about how to communicate with the server using HTTP. In Angular, this means observables, and RxJS. We'll start out with an introduction to RxJS. Then we'll learn how to communicate with the server. In this module, we're going to move all of our data storage from the client to the server. We'll go through the event service and the voter service and change their functionality to store their data on the server. Along the way, we'll learn a lot about how Angular works with RxJS. Finally, we'll move our authentication to the server and implement the logout feature while we're at it. HTTP communication is key for most web applications, so this is a module that will be critical to learn. It's important to understand the basics of HTTP communication so that we can see where RxJS fits into the mix. Here's a simple diagram of HTTP. The client sends a request to the server, and the server responds. This is an asynchronous communication pattern. The time between the request and response could be several hundred milliseconds, or more, so our client continues to process while this is happening. In the old days, we handled this with a simple callback shown here. We made a request and some kind of callback function handled the response whenever it returned. Then, along came promises. Promises were nice because we could arrange our handling of async operations a bit better. Multiple pieces of code could listen to the result of a single call, and we could avoid nested callback hell, and now we have RxJS, and their main feature, observables. Looking at the code here, you can see that the basic handling hasn't changed a whole bunch, but the feature set really has. First, let's clear the main difference between promises and observables. Promises represent a single value that comes back sometime in the future. Observables on the other hand represent zero or more values that come back either immediately or in the future. Right off the bat, we can see a major difference between the two. Promises are limited to a single value, where observable are not, and promises are asynchronous, where observables are either synchronous or asynchronous. And there's plenty of other features that observables support that promises do not. Observables are often referred to as a stream of observable data, or in essence, any value that changes over time. Consider for example mouse clicks. Each happens at a specific time and has an x and y coordinate. Observables are excellent for handling data like this since not only can you observe this data and respond to each mouse click as it happens, you can also manipulate the data stream. Let's say for example that I wanted to just react to each x position, not caring about the y position. I can manipulate the stream so that I'm only dealing with the x position, like so. This is generally done through a map operation where you map an incoming value to a new value. With observables, this is a core activity and very easy. This comes in very handy when dealing with HTTP responses since the data that comes back is often way more than we want, there will be status information, headers, et cetera, when really all we want is to return data. So mapping a response to just the return data is very natural with observables. Observables have a lot of other features that are very valuable as well. They can be synchronous or asynchronous, they have improved error handling over how promises work, they can be closed independently of returning a value, and they can also deal with time in a way that promises cannot. There's a bunch of advanced operations they have as well such as mathematical aggregation, buffering, so that you get several results together in batches, or debouncing, so you don't get too many results if they happen too quickly, you can only deal with distinct values, or you can filter the values down to just the ones you want. You can also combine multiple observables into a single observable. And they have a built-in retry mechanism so that if the first try fails, they can retry again. So now we know that observables are the answer we've all been looking for for every problem we've ever faced while programming. Therefore, we should purge all knowledge of the despicable technology we call promises from our brains, right? Well, not so fast. Remember in our HTTP communication model where that communication consists of a request and a response, unless we're using sockets, each HTTP request can only represent a single value, so being able to deal with a stream of data does us no good. Unless we're using sockets, each HTTP request only represents a single return value. It might have multiple pieces of data inside that single value, but in the end, it's one response that comes back, so being able to deal with a stream of data does us no good. For most purposes, a promise works just fine when doing HTTP communication. Of course, Angular's HTTP library returns observables, so this really doesn't matter, does it? Well, yes it does, because of one key feature that observables in Angular support, and that is the toPromise conversion function, which will take any observable, and convert it to a promise. So if you decide you can cast any HTTP request down to a promise, and you can even do it after you map the data from the response to extract just the data you want from it. That can make your handling of HTTP requests benefit from the features of observables, and the simplicity of promises. Now that doesn't mean that this is a recommended way to deal with HTTP, it just means that observables aren't necessarily the only way to handle things. You can choose for yourself whether or not to leave all your HTTP communication as observable, or convert them to promises, it's up to you. In this course, we'll only use observables so as to get the most familiarity with them. Just don't write off promises in your code. And with that, we'll finish up our introduction to RxJS. There's a practice exercise for this clip, if you want to do that now.


*/