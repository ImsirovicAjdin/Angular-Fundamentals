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
14.08 Integrating Authentication with the Server
We're now storing our event data and our voter data on the server. The last type of data that we need to move to the server is our user and authentication data. Up until now when we log in, we're only logging in on the client. We want the server to also know that we've logged in, so we want to send that authentication to the server. In fact, we want to authenticate on the server. We don't even want to check the username and password on the client, we want to have the server check our username and password. Now different servers are going to deal with authentication differently, and that's beyond the scope of this course. Our server is a simple little node server that uses a library call Passport to deal with authentication, but how we interact with the server is going to be fairly similar from one Angular application to the next, and from one backend to the next, we're just in the end going to be making HTTP calls. So we are going to make those changes by going into our auth service, and we're going to start by implementing the login method here. It's this login user method that we need implement. Right now, it's just doing sort of a dummy log in. No matter what you do, it just sets the current user. It's important to note that we do set the current user, the login user method, its main purpose is to set the current user when somebody gets logged in, so we do need to set the this. currentUser property, but we're not going to set it like this. So I'll comment out this code just to remind me that this is the functionality I need, but instead, I'm going to make an HTTP call. Of course, we need the HTTP service, we need a constructor, private HTTP object of type HttpClient, and let's import that from Angular common HTTP, and then in our login user method, we will start by calling this. http. post. That's the method I need to call in order to log in. The URL is /api/login. Again, I'm designing the server with this URL to log in when somebody makes a post method to this URL. How I design the server is completely up to me. How you design your own servers are completely up to you, so the URL is likely to be entirely different. The method probably could be a post for a log in, but you might decide to do something different on a post. That's really up to you and your interpretation of what is the best way to write a server. So don't look at these aspects like what the URL is and what method is and assume that this is absolutely the best way that every server should be written exactly like this. Again, the details of the server and how you write them are up to you, but you do need to know what the URL is on your server for the endpoint you're working with, and you need to know the shape of the data you need to send up, or the shape of the data coming back, so that you can interact with them on the client. Now in our case, we need to post up some log in info, so let's create a loginInfo variable, and that's going to be an object. It looks like this has a username property, and we'll set that equal to the username that's passed in, and notice something very important here. The property that I'm creating is username, all lowercase. I have to do it exactly that way because of the server that I'm using, which is using Passport, is expecting a property that's called username, all lowercase. If I accidentally do username like this, my log in is not going to work, so that matters. In the server that you write, it might be like this, it might be something else. It really depends on the server. Then we need to pass the password as well, so we'll create a password property, and send in the password, and there's our loginInfo object, which is going to be the body. And of course, we need to create some options, so we'll create an options, and that's an object with the headers property. We'll create an HttpHeaders, which we will bring in from Angular common, passing in an object with a content type, that has been set to application/json. So there's our options and our loginInfo, we pass in the options third. So we're now posting this data. Again, remember we need to set the current user. So when this call from the server returns, I want to set the current user equal to whatever data comes back, but I don't want to do it in the subscribe method, because I don't want to subscribe here, I just want to make a side effect, and I can do side effects by piping in, calling the pipe method, a special RxJS operator called tap. Tap is the way to tap into the stream and take an action when a piece of data comes through the observable. We're not manipulating the value in any way, so we don't want to do something like map, we want to use the tap method, it lets us just see the value that comes through and we can take an action if we want based on that value, but we're not manipulating what's going through the observable stream. So let's import tap, and then I'm going to pass into that a callback function which receives the data item that is going through the observable, and we'll take an action based on that, and in our case, we want to set the current user, which is what this method was doing. So we'll set this. currentUser, and we're just going to take that data object, we're going to grab its user property, and we do want to cast that to an IUser. So we've now set this. currentUser, which indicates a successful login. I can delete this commented out code now. Of course, we do want to handle errors because the user might have typed in an incorrect username or password, so in that case, the server is going to return an error. So let's catch errors, and let's import that. Now before, we had this complex method to deal with reporting out errors, but in the case of a failed login, we don't want to report that out to the console, and instead, we want to change the value in the observable stream, we want to add a false value. So I'm going to create a callback method, and I'm going to return the of function, which I'll import from RxJS observable of, and I pass in false. What I'm doing is I'm creating an observable of false, and that's what's going to happen if there is an error. So for example, the server might return a 403 HTTP error, and that's when this method would execute and put a false value into the observable. So let's return out this observable, and I'm going to save that, and let's go into our login component, and here is where loginUser is called. So now that's an observable, so I'm going to subscribe to that observable, and that passes back some kind of response from the server. I don't really care what the response is, so long as it's not the value false. So we'll pass in a callback function that receives a response, and we'll say if the response was false, then we know that our login was invalid, and we'll do something about that, otherwise, the login was valid and we can navigate over to events. We'll put our call to navigate right there, and if it's invalid, we need to do something, we need to show a message to the user. We don't have that functionality yet in our application. So let's create a new variable on our login component called loginInvalid. We'll default that to false, and here, we'll set it to true. And now we can show something to the user if their login was invalid. So let's save that and head over to the login components HTML, let's go way down here to the bottom, and after our form, let's add in a br tag, and then a div that we will only display if loginInvalid is true. And the class will be alert and alert-danger, and we will give the message Invalid Login Info. Let's save that change, and we'll go over to the browser, and we'll see if this now works. So let's put in something invalid, I'm just going to type in random letters, click login, and we do get the message Invalid Login Info. I'm going to log in with something valid, and I know that one of my usernames that is valid is johnpapa, and the way that the server's implemented, it doesn't actually care what you put in for the password, you just have to have the username correct, and that returns true. Obviously, a real server wouldn't do this, it would actually check the password, but in this case, the server we wrote doesn't care about that. So I'll click login, and lo and behold, it logs in, and we have the Welcome John message up here at the top. And there we've implemented login on the server. To sum up, it is very important that you understand how your server operates. I know exactly how this server operates, what data I have to send to it and what methods and URLs I have to use to get different things to work. You have to understand that about your server, and how you write your server can determine what URLs you're using, what methods you're using, and what the shape of the data going in and out is, that is all beyond the scope of this course is how you make your server, we're just focusing on how we interact with a server that has known URLs, known behavior, known data.



*/