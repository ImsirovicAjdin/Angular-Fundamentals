import { Routes } from '@angular/router' // this adds TypeScript type definition and compile-time safety so we can't type paht typo without being warned about it
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'


export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent }, // /events/1 or /events/foo
  { path: '', redirectTo: '/events', pathMatch: 'full' }
]
