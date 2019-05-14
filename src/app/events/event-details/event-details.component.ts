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
Guarding Against Route Activation
Sometimes we want to prevent a user from going to a particular page or discourage them from leaving a page. That's what route guards are designed to do. If we take a look at the IntelliSense for one of these route objects, I can do that in VS Code by hitting ctrl+space, then you can see all the different properties available on a route thanks to TypeScript. Two of these properties are canActivate and canDeactivate; canActivate allows us to determine whether or not a user can navigate to a route. Let's take a look at how canActivate works. And there are a couple different ways that we could do this. We can either use a function or we can define and use a service. We're going to use a service here because it gives us flexibility and the ability to inject other services, and we're going to need that. So, right now, if we go take a look at the site, I can navigate to an event details page with a URL like this, and that works fine. But if I navigate to the event details page using an invalid event ID like this, the page actually loads, but it sure doesn't look very good because there's no data here. We'd like to put a route guard in here to redirect them to a 404 page if the event ID is not valid. So let's create that 404 page first. This will be quick. First, let's add an errors folder. And then we'll add a 404 component. Okay, and let's grab that component out of our GitHub helper repo. So over here in the app folder, there's an errors folder, and it says 404 component. So let's grab the component out of there, and we will paste it into here. Okay, now we just need to add that to our module. And add it as a declaration. And then we just need to add a route for it. Okay, let's just import that. Okay, now we should be able to hit that page. Come over here and navigate to 404. Okay, good. So now we have a 404 page that we can redirect to. Okay, so we're going to add a route guard that sends us to that 404 page. So let's go create a service called EventRouteActivator. We'll add that in the event details folder. Okay, and the shell of our route guard service will look like this. Okay, so we just have our basic injectible service here, and then we're going to make this implement this CanActivate TypeScript interface. Okay, so that requires us to implement the CanActivate method. Alright, so we want to just check to see if the ID passed in is a valid event. So we need to inject our event service. And we'll inject that here. And then in our canActivate method, we'll look up the event. So we'll need to grab the event ID off of the route. This will be easy since the current route is passed in to the canActivate method as the first parameter. So we can grab it like this. Okay, let's import that. Okay, now we can get our event off of the events service using the ID from the route like this. Okay, now if this doesn't return a valid event, we want to redirect to our new 404 page. So let's just set a boolean variable based on whether this call returns a valid event. And then we'll just cast the result of this call to a boolean. Okay, and then we can just, right here, check to see if the event exists, and if it does not, then we will navigate to our 404 page. Okay, and we'll need to inject that router. Okay. So here we're loading our event. If it does not return a valid event, then we redirect to our 404 page, and then our canActivate method needs to return a boolean. So we'll return here whether the event exists. Okay, so it will return true, meaning the route can be activated if the event exists, otherwise, it will return false. Okay, that's all there is to creating a route guard. Now we just need to go add this as a provider into our module. So we'll import it up here. And then we'll just add it as a provider. Okay, so now we have this route guard. We just need to go attach it to the route that we want to add a guard to. So over in our routes, we have our event details route right here. And then we're just going to add canActivate and pass in our event route activator. Okay, cool, so that's all wired up. Let's go check it out. So now, if I go to events/1, that's not working, actually. I think there must be something wrong with our call to getEvent. Oh yes, we need to cast the event ID to a number here. I think that should fix it. So let's try this again. Okay, cool, that works. But if we go to event 42, then it does not work, it sends us to the 404 page. So that's exactly what we're wanting. Okay, so that was pretty easy. Now you know how to prevent routes using a route guard. And there's a practice exercise for this clip, so go check that out.
*/