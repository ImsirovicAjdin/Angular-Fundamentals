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
Navigating from Code
Okay, we've just seen how to link to our routes from our HTML. Now let's take a look at how we would navigate to a page from within our code. For that let's create a real simple component. This will become the page that we use to create new events. But for now, we'll just make it a real simple page. So we'll add that in our events folder. And it'll be a real simple component for now. And for now we'll just use an inline template. Okay, so this page isn't going to do much right now, but we'll expand this page out in the module on forms. But we'll use it right now to demonstrate how to navigate back to the All Events page from code when the user clicks this cancel button. So first let's get this page wired up so that we can see it. We need to add our new component to our module. So we'll import it here. And then we'll just add it to our declarations down here. And then let's just add a route for this page. Okay, and import that component. Okay, and the placement of this route is kind of important. And actually, we have it in the wrong place right here. Problem is that this path actually matches the path above it. So Angular doesn't have a way to differentiate between whether we're trying to pass in the ID new to the events/:id path or whether we're trying to hit the events/new path. And so, actually, let's move this up here. That way it'll get processed first. So with Angular sees events/new in the URL, it will hit that first and will send us to this route. Otherwise, it'll keep looking for a matching path. Okay, so this is all wired up. So if we come over here, we can go to /new and that will take us to this page. So let's just add a link to this Create Event element in our nav. So back over in our nav component. Right here where this Create Event is, let's add a router link. Alright, now I should be able to click on this. Okay, there we go. Alright, now this cancel button doesn't do anything right now. What we want to do is when we click Cancel, we want it to just take us back to the events list page. So let's go wire that up. So over here in our Create Event component, let's just add a click handler on our cancel button. Okay, that's wrapping kind of funny, but you can see, when we call click here, we're going to call cancel on our component. So let's go add that method. Okay, now, to navigate from code, all we have to do is inject Angular's router service. So let's import it, and inject it. Okay, now all we need to do is call navigate on the router and pass in the route that we want to navigate to. And that should do it, let's take a look. I refresh here. Now, if I hit Cancel, there, it takes us back to our All Events page. That was easy. All we needed to do was inject the router and call navigate. And there's a practice exercise for this clip, so go check that out.
*/