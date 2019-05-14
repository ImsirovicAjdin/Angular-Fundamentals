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
Linking to Routes

Alright, so now we have our two pages working with routing, but we have no way to navigate between them other than just changing the URL. We would like to make it so that when you click on each of these event thumbnails, that it takes you to the event details page for that event. So let's go over to our event thumbnail component. Up here in the HTML, we're going to add a router link to the main container div like this. So that's going to turn this div into a link. And when you click on it, it's going to navigate to /events and add the event ID to the route. And that's all we need to do to add a link to the new route. So let's go check that out. And if we refresh over here, now if I click on Angular Connect, notice that it loaded the Angular Connect event. So it navigated to events/1. And if we go back and click on NG Netherlands, then it loads that event, so that's working great. So that's really easy to add router links. But now, how do we get back to the events list page? We'd like to make it so this All Events link takes us back there. So let's go over to our nav component, which is in here. Okay, so here's the HTML, and here's our All Events link. You can see it's already got an anchor tag around it. And we can add the router link to an anchor tag just like we did with the div in our thumbnail component. So it'll look like this. Okay, and notice that the expression for our router link takes in an array. That array is basically a list of path segments followed by the parameters, and there's no parameters for this route, so it's just /events. The link for the event thumbnail that linked to the event details, we passed in /events and we passed in the event ID. Okay, so this should be working, let's go take a look. Better refresh over here. I can now click on All Events, and I can go back and forth between the events list and the event details. Cool. And there's a practice exercise for this clip, so go check that out.
*/