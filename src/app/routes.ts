import { Routes } from '@angular/router' // this adds TypeScript type definition and compile-time safety so we can't type paht typo without being warned about it
import { 
  EventsListComponent, 
  EventDetailsComponent, 
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver
 } from './events/index';

import { Error404Component } from './errors/404.component';



export const appRoutes:Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },    
  { path: 'events', component: EventsListComponent, resolve: {events:EventListResolver} },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] }, // /events/1 or /events/foo
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
]
