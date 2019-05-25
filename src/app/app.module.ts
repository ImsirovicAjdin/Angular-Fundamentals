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
14.02 Preparing to Store Data on the Server
In this module, we're no longer going to be gathering our data from inside of our application, we're going to be communicating with the server. But in order to do that, we need to have a server to communicate with, and we have built a small little server specific to this course that looks and acts like a real server, lets us gather data and save data, but it doesn't really have all the features of a real server. Getting into actual server-side technologies is way beyond the scope of this course. We're just going to be dealing with how the client interacts with the server. Let's start by installing that little server, I'm going to go to a command line, and I'm going to type in npm install ngF -server, and I'm going to save it to my dependencies with a -S,

npm i ngf-server

 and now that that's installed, we'll go back to our code. We're going to open up the package. json file, and now if you look right down here on line 26, we've got our ngF server installed. We need to run that service, we're going to need a new command for that. I'm going to name this command server, and that will call node, this is a little node server, and we'll add a parameter to that which is the location of the server file, which is inside of node_modules/ngf-server/server. js, and we'll save that change, and back to the command line, we can run that command with npm run server and that will launch our custom little server that we can talk to to save and request data from. And we are still going to be using the CLI to serve up our files. So we need to tell the CLI's web server that when we make certain requests to certain URLs that it actually needs to talk to our little custom server. This is only for dev mode. We do that with a special proxy file, so I'm going to create a new file, I'm going to name it proxy. conf. json, I put that in the root, and inside of here, there's a JSON file, so we start with an object. I'm going to tell the CLI that whatever I make a request to any URL starting with API that I actually want it to talk to my own server, which is running on port 8808. So it's going to be target, and we give it the url http://localhost:8808. And finally, we're not running an SSL server for this little server, so we can tell it secure, false. I'll save that change, and back in my package. json file, whenever I launch the CLI which I do with the start command, I need to tell it that I want it to use that configuration file for the proxy settings. So I'm going to add on a proxy-config with a setting of proxy. conf. json, which is the path to that file. Save that change, and now in a different command line, if I was already running a server, I would stop it at this point and restart it, and just start it again with npm start. If I'm not running a server at this exact second, I'll just start it back up. And starting it again is now going to run it with that proxy-config setting. And there we go, our server is running on Port 4200, so we go back out to the browser and refresh, and our application is still running correctly. It is using that proxy server and will talk to our actual server, but we aren't doing anything yet, so there isn't any communication going on quite yet. Now this arrangement is complex enough that I want to spend a minute and just look at a couple of diagrams to explain how this works. This is again only for development. When we're talking about going to production, the arrangement is going to be different. This is how our servers are arranged in development. We're going to be running both the CLI server and our new HTTP server that we installed just a few moments ago. When our browser makes a request for something like /home or a CSS file or something else along those lines, anything that the routes file would answer to, pretty much any URL that doesn't start with /api, then the CLI server is going to respond to that request and serve up whatever file is appropriate. If it's a route, it's going to serve up the appropriate index file. If it's an actual file like a CSS file or an image, it's going to respond to that image. But any other scenario, where we are going to make a request to something like /api/users, again, this is based on the configuration we did in that proxy configuration file, the CLI server is going to see that request and pass it on to our actual HTTP server that we spun up and installed just a moment ago, which is running on localhost 8808. That server's going to respond based on its own internal rules. So for example, if we ask for /api/users, it's going to send back JSON that lists all the users. So that response comes back from the server, the CLI server then receives that response, and sends it back to the browser. Again, this is only how it works in dev. In production, it's more your typical scenario where your server actually handles all requests whether they're to /home or to /api/users. And so it's time to start using HTTP. We're going to start that, we're going to be moving all of our data communication to using HTTP. And to start off that process, I've got to make some changes to my app module file. I'm going to close these files down and open up app module, and in here I'm going to tell my module, my main module, that I now need to work with HTTP. I am going to import from @angular/common/http and from there, I'm going to import the HttpClientModule, and then down where I create my module, I'm going to add that to the imports. And that has now imported the client module and all of its relevant classes and utilities into this module so we can now begin using HTTP. Save that change, and in the next section, we'll actually start accessing some of our data over HTTP.

ng serve --proxy-config proxy.conf.json

npm run server
 

*/