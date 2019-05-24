
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
    // { provide: MinimalLogger, useExisting: Logger }
    // { provide: Logger, useFactory: factory() }
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
11.07 The useExisting and useFactory Providers
Now we've looked at the use value way to provide services, and also use class, which is the longhand for what we normally do with services, when registering them as providers. There are actually two more ways to register providers, that we're going to talk about in this section. We're not going to look at very concrete examples of these, because it's really unlikely you will ever need to use either of them, but they exist and so it's good to know about them. One of them, is called use existing and it looks like this. This is also known as the alias provider, and there's a fairly limited set of scenarios where you'd want to use these. One, that comes from the documentation, is to minimize an API. Say, for example, you had a logger service and that logger service was a big service that had a very large API, maybe it had 20 or 30 different methods in it, but in your application you're only using the most common five. You create a minimal logger service, and what that does is, now you're getting the API for the minimal logger, and of course it has to be a class, this cannot be an interface, the minimal logger must be a class. It's never going to have an instance created of it, because whenever somebody asks for a minimal logger, they're going to get an instance of the logger. This would be the kind of class that has no implementation, you would just create the methods just for the API. Whenever they ask for minimal logger, they get the logger, but the only methods that they can see, in IntelliSense are the three year, two or four methods that are on minimal logger that you actually want to use. That's one example, it's really not a common case, not something you're likely to use, but it is something that exists and that is this use existing provider. The last one is used factory, and this is even more complex. In this case, what you're going to do, is you're going to register a class. Say, you're minimal logger... Well let's change this to something simpler like logger, but what you're going to do, is you're going to give this use factory parameter, a function that is a factory, okay? You can actually call the function and pass in some parameters. What that does, is it allows you to parameterize the creation of an object, this is really only used to very complex cases, all of which would be on the scope of this course. If you need more information, you can check out the official documentation. That is the basic usage of the use factory. Again, you're unlikely to run into a situation where you need it, but if you do need to have a very complex way to construct an instance of a class, to use as a service, then use factory is the way to do it. There is a practice exercise for this clips, so you can go ahead and do that now if you wish.
*/