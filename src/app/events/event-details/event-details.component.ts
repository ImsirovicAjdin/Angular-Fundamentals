import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'


@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height: 100px; }
  `]
})

export class EventDetailsComponent {
    event:any

    constructor(private eventService:EventService, private route:ActivatedRoute) {
  
    }
    ngOnInit() {
        // this.event = this.eventService.getEvent(1)
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']) // we're casting to a number with the + in front of 'this' 
    }
}
/*
6.10 Styling Active Links

Styling Active Links
Typically, when you have a navigation header in your site like this one, you want to highlight the currently active link so that users can see from the nav bar which section of the site they're on. So let's go make it so these All Events and Create Event links are highlighted when we're on those pages. All we have to do is add a routerLinkActive directive to each of these links like this. So this is basically saying, when this link is active, apply this active CSS class, and we'll add that class here in just a second. Let's go ahead and add this routerLinkActive directive to this link also. Okay, cool, now let's come over to our component and add that CSS class. Okay, cool, so we're just going to add this orange color whenever the active class is applied. And we had to add the extra li prefix to our styling here so that it is specific enough that our styles don't get overwritten by bootstrap. Okay, so let's go check this out. If I refresh the site now, cool, you can see that All Events turned orange because I'm on the events list page. And if I click on Create Event, you can see it gets turned orange also, but the All Events link should not be orange here. This is happening because the routerLinkActive binding will do a startsWith match. So if we take a look at our router links over here in our HTML, you can see the events route will get the active link whenever the route starts with /events. So that is also matching when the route is /events/new. But we can change this to be less greedy by setting the router link options to require an exact match, like this. Okay, so this will make it so that the active class only gets applied if the route exactly matches /events. So let's go take a look at that. Let's refresh here. Okay, cool, now you can see we're on the Create Event page, and only it is highlighted. If I cancel and go back to All Events, you can see it turns orange, and only it is orange. So this is working better now. Cool, that was super easy, and it's cool to see something like this work with so little effort.

*/