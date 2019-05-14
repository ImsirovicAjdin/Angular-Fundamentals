import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height: 100px; }
  `]
})

export class EventDetailsComponent {
    event:any

    constructor(private eventService:EventService, private route: ActivatedRoute) {
  
    }
    ngOnInit() {
        this.event = this.eventService.getEvent(1)
        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    }
}
/*
Adding Multiple Pages to Your App
Before we can demonstrate routing, we need to have multiple pages in our app to route to. Currently, we're displaying a thumbnail for each of our events here. But we would like to have a page where we can show more details about each individual event. So let's create an event details page, and then we'll see how to navigate to that page when we click on one of these events. Before we jump in, I just wanted to remind you that we've made changes to this course to keep it up to date. This course was originally created without the CLI since it was still in beta. Because of these updates, you may notice some inconsistencies in the file explorer over here. Those inconsistencies have been explained previously. Okay, so there's going to be a number of things in this event details section of our site. So let's create a folder for this component. And then in here we'll create our component. Okay, and let's create the basic shell for our component. Okay, now let's add the properties for our component here. And typically, we've added a selector here so that our component can be used from within an HTML page. But this component isn't going to be used as a child component from another page. It's going to be routed to directly so we don't need a selector. But we're going to put our HTML in a separate file, so we're going to want a template URL. And that'll go here. Okay, let's go ahead and create that template file. Okay, and then we're just going to want some HTML here to show some basic information about this component. We don't want to have to type this all in, so this is also available over in our GitHub repo. So let's jump over there. And it's inside this app folder in this events, event details folder. And it's this HTML right here. So I'm going to click on Raw here. Okay, and here's our HTML. Let's just go ahead and copy that, and we'll paste it in right here. So this is just some basic HTML with some bindings to an event property on our component. Alright, we're going to want a little bit of styling here, so let's add a class on this outer div here. And then we'll add that style to our component. This will just add some padding around the whole thing. And one more style to add. We're going to want to limit the size of this image here. Okay, so let's add that style over here. Okay, so as we sign our HTML, we're binding to an event object here. But our component doesn't have that property, so where's that going to come from? Well, this page is going to be navigated to directly, and the idea of the event that we want to view will be in the URL. So when we navigate to this page, it'll be a URL like this. So that one will represent the event ID for this page. Okay, so when this page is loaded, we're going to want to make a call to the event service to fetch the event for this page. And remember, we don't want to do that in the constructor because that is going to be a longer running Ajax call. So let's create an ngOnInit method here, and we'll do it in here. Okay, and we'll pull this from our events service. If we go over and look at our events service, it only has a method right now for retrieving all of the events. We just want to retrieve a single event. So let's add a new method here called getEvent. And that will take in an ID, that will be a number, and then we'll just pull that out of the events array. And again, we'll have this make an Ajax call later, but for now we'll just pull it off of the array like this. Okay, so now let's go call that from our new event details component. So first we're going to have to import that service. Okay, now we just need to inject it. Okay, now we can just make that call from ngOnInit. Okay. And remember, we're going to be passing the ID of the event in on the URL. And we're going to want to pass that ID in here. But for now, let's just hard-code this to event 1. Okay, and we have to declare that as a property. Alright, now this component is ready for use, but we need to register it in our app module. Okay, and then we'll register it down here. Okay, so now we have another page to route to, but the question is, how do we get to it? Let's add our first route.
*/