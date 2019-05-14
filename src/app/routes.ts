import { Routes } from '@angular/router' // this adds TypeScript type definition and compile-time safety so we can't type paht typo without being warned about it
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';


export const appRoutes:Routes = [
  { path: 'events/new', component: CreateEventComponent },    
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] }, // /events/1 or /events/foo
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
]
