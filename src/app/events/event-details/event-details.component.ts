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
6.12 
Organizing Your Exports with Barrels
We just demonstrated how to organize our code into modules. Let's take a look at another way to clean up our code a bit. If we take a look at our app module, it has quite a long list of imports. And most of them are coming from the events folder. We can simplify this a little bit by exposing all of the imports inside the events directory from a single index file that we can then just import with a single import line. This is referred to as creating barrels. So let's start by creating a barrel in our events directory. So we'll create an index file right here, and then we'll simply import each of the components in this directory and re-export them, like this. Alright, now we can do this for all of our subdirectories. And we'll even do it for our shared folder for consistency even though it only has a single file inside it. So let's go ahead and create that now. And it'll just export the event service. Alright, now we can actually add this barrel to our outer barrel like this. Okay, now we'll do the same thing for the event details folder. And we'll export the two things that are in this folder. Alright, and we need to add that to our outer barrel too. Okay, now that we have these barrels created and they're all rolled up into this one barrel, we can now go simplify our imports in our app module file by creating a single import. So we do that like this. Okay, so there's our one barrel that has everything exported from it. Now we can move up everything from the events directory like this. Alright, now we can delete all these extra import lines. Okay, that looks much better. Now we can go simplify our routes file too. So it has a lot of imports in here from the events folder. So we'll make a single import for those and move each of these. Okay, then let's clean these up. Okay, that feels a lot better too. So this will make things a lot more simple each time we need to add something to these imports. So let's just go take a look at our site, make sure that everything's still working. So we'll refresh. There we go, everything's still loading just fine.
*/