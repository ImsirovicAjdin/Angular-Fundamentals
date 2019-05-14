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
Guarding Against Route De-activation
Just like we used canActivate to prevent the user from navigating to a page, we can use canDeactivate to prevent a user from leaving a page. This is often helpful if, for example, you want to warn a user if they try to navigate away from a page before saving their data. So let's add a route guard to the Create Event page that warns the user if they try to cancel before saving their event. So we'll start by adding a canDeactivate property to our create event route. And remember, we said that there are two ways to add route guards. You can either use a function or a service. In our canActivate example, we used a service, but we don't need something that involved for our canDeactivate. So let's just use a function. So to use a function, you just add the function name here. So we'll create a new function called canDeactivateCreateEvent. So the question is, where do you define this function? Well, we just need to register this as a provider in our module. Let's go over to our module. And then down here in our providers, we've been defining providers using this shorthand approach. If we take a look at this event service provider, another way we could provide this is using the longhand approach like this. So this is the longhand form. It says when this is requested, use this to fulfill it. And it just makes a lot more sense to use the shorthand form in the cases where we're using services. But in this case, we're going to be requesting a string, canDeactivateCreateEvent. And for that we want to provide a function. So we'll put that here. And then for useValue, we'll create a function called checkDirtyState. Okay, and let's just put these on their own line. Okay, so now we need to define that function. We could define that over in another file, for ease of use, let's just define it right here. Alright, just to demonstrate this, let's just have this return false right now. Okay, let's go check this out. If I refresh our Create Event page here and try to hit Cancel, you can see it no longer works. The cancel button, remember, is wired up to send us back to the All Events page. And it's being prevented by our route guard. And not only is it being prevented here, but also, if I click on anything that would take me away from this page, it prevents me from doing that. So that's pretty awesome, how easy that is to just disable all navigation in your application using a route guard. Okay, so let's make this a little more interesting. What we really want to do is prevent them from leaving this page only if they haven't saved their event. So the question is, how will this checkDirtyState function know the state of that component? We have to have a way to know if they've saved the event or not. Well, that's actually really easy. The very first parameter that is passed in to your canDeactivate function is the component itself. So let's go take a look at our create event component. If we were to define a property on this component that represented the component state, we could access that property in our canDeactivate function. For now, let's just add an isDirty property on the component like this. Okay, so we've created this isDirty property, and it's defaulted to true. And this is essentially a public property. So over in our checkDirtyState function, if we grab that component that's being passed in, then we can check that isDirty property like this. Alright, and if the component is dirty, let's call the HTML confirm dialog and return the result like this. And then if the component is not dirty, we can just return true. Okay, cool, let's go check that out. So let's refresh this page. Now, if I hit cancel, okay, cool, now I'm getting this confirmation dialog that says you have not saved this event, do you really want to cancel? And if I say cancel, it will not, and if I say OK, it will. And then, just to show that this is really based on the state of that component, let's go make that component return true, or return false. So now it's not considered dirty. So now if I hit Cancel, it will just work. Of course, we'll want this to do something more than just return true or false. We'll come back to this when we wire up our create event form and make this return something reasonable. Alright, cool, that's all there is to adding a canDeactivate route guard. And there's a practice exercise for this clip. So go check that out.
*/