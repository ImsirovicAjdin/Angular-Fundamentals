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
Accessing Route Parameters

Okay, so when we navigate to our event details page, this event ID is always being ignored. So no matter what event ID we put in here, it always loads Angular Connect, which is the event with ID 1, and that's because in our event details component, when we call the getEvent here, we're always passing in event ID 1. So let's see how we can pull that event ID off of the URL and use it in our component. Remember that over here in our routes, we added this ID parameter. That colon in front of the ID is a cue to Angular that this is a parameter in the URL. Angular will take whatever value is passed in to that location in the URL and will create a parameter named id for that route, and that parameter will be set to the value that's passed in at that point in the URL, and then we can access that in our component. So if we navigate to events/4, then the ID parameter for this route will be set to 4. So if we come over to our component, we can import ActivatedRoute from Angular. And then let's just inject that into our constructor, and we'll just call it route. And then down here, we can just use that to get the event ID like this. Okay, so on this ActivatedRoute service, we're calling snapshot. params That will give us the parameters off of the current route that was used to access this component. And then this is wrapping a little bit funny, but we're passing this in as a parameter to getEvent. And getEvent takes a number. So let's just cast this to a number. Okay, so now we are passing in the event ID as a number into getEvent. And notice that this ID here matches this ID over here in the route. Okay, let's check that out. So let's refresh our page here. Notice that we went to events/4 and it loaded a different event. And if we go to event 3, we get NG CONF, and that NG CONF image is a little crazy. It looks like we might have a typo in our styles. Let's go take a look at that. Okay, yeah, here. We have a colon here that shouldn't be here. Let's refresh that. Okay, that looks better. So now, as we navigate around, that image is going to be a little better. And you can see that we're loading a different event that matches the event ID that we're passing in. So that's how you pull parameters off of the URL using the ActivatedRoute service. And there's a practice exercise for this clip, so go check that out.
*/