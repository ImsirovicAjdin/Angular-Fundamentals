
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
  DurationPipe,
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/nav-bar.component'
//import { TOASTR_TOKEN } from './common/toastr.service'
import { TOASTR_TOKEN, Toastr } from './common/toastr.service'
// import { TOASTR_TOKEN as TOASTR_TOKEN2 } from './common/toastr.service'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'
import { CollapsibleWellComponent } from './common/collapsible-well.component';

//declare let toastr:any
let toastr:Toastr = window['toastr'];

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
    CollapsibleWellComponent
  ],
  providers: [
    EventService, 
    //ToastrService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: EventRouteActivator, useClass: EventRouteActivator },
    EventListResolver,
    AuthService,
    // { provide: AuthService, useClass; EventService }
    // { provide: Logger, useClass; FileLogger }
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
11.06 The useClass Provider
In our last section, we talked about the Opaque Token and using that when registering this provider, the Toastr Service provider. One of the things that I kind of glossed over, that I want to talk about a little bit more in depth, is how this syntax using the object is a little bit different than this syntax right here. The reason for that, is that this syntax where we simply pass in a class, this is just shorthand for using the object syntax, like this. We can replicate that with the following, so what we've got here is the same type of syntax. We got a provide key in this object and instead of use value that we used, because we already had an existing object, we're saying use class. Again, this is our token, is the class self, and we're saying whenever somebody uses this token to look up something in the dependency injection registry, I want you to actually use an object created by this class here. So, use the event route activator class to create an object, and return that whenever somebody asks for an object using the event route activator class as the token. So, it's longhand and we just shorten it out by just removing all the syntax and just passing in the class name itself. Now, because that longhand works and it actually has two different values, so let's use it on this off service, we can actually sort of do some funky things by saying use class, but instead of passing in the off service class, I can pass in something entirely different, like event service. And now, whenever somebody asks for an off service, they're actually going to get an instance of the event service. Of course, that would be really bad in this case they don't have the same APIs, you would never want to do something this weird, but you might want to utilize this functionality if you're doing something like, you have a very specific kind of implementation of the class, but you have a generic class you're using. Say we've got a logger class, and that's what people are going to ask for, but we actually want to use a file logger specific implementation. Of course those classes don't exist, so that wouldn't work in our application, but that's an example of where you might want to utilize the longhand syntax. Let's just reset this back to the way that it was, and that's the use class syntax for registering providers.
*/