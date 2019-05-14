import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from '../shared/index';

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height: 100px; }
  `]
})

export class EventDetailsComponent {
    event:IEvent

    constructor(private eventService:EventService, private route:ActivatedRoute) {
  
    }
    ngOnInit() {
        // this.event = this.eventService.getEvent(1)
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']) // we're casting to a number with the + in front of 'this' 
    }
}
/*
7.8
Using Multiple Validators in Reactive Forms
In this model driven form that we just created we're passing just a single validator to each of our fields. What if we wanted multiple types of validators on a field? Well, that's easy, we just pass in an array of validators to our form control. So let's add a pattern validator to our first name that requires first name to start with a letter. So we'll just turn this into an array and we'll also pass in validators dot pattern and validators dot pattern takes in a parameter that is the pattern that you want to validate against. So that will just look like this. Okay, so now we have two validators on my first name field. Okay, so let's go check that out. Let's refresh and log in and then over here if I leave this field blank, I'm still getting my required field validation but if my field starts with a number, it's invalid so it is showing that it's invalid here but the problem is my message is still saying required, it should say something about that it's not matching the required pattern. So we're going to have to have a couple of error messages in our HTML. So right here let's add another error message and it will say must start with a letter. Okay, but this still isn't quite right. Now both of these errors will be displayed whenever the first name field is not valid, regardless of the reason. So I need to add another check on each of these like this. Okay, so required is set to true when there is a required error and then we can do the same thing here with pattern, alright, let's go check that out. Let's refresh our app and log in, and then over here if I delete this, then I get a required error and if I make it start with a number, then it says it must start with a letter. Okay, so pretty easy to add multiple types of validation. Okay, so we've shown required validators and pattern validators. We're not going to go through all of the types of validators that are built into Angular but if you come over to Angular. io, and go to docs and then search for validators, this first result here shows the different types of validators so there's required, min length, max length, and pattern. These others are for more advanced cases and then it explains each of them down here and if you need something beyond these, you can create a custom validator. We'll take a look at that in just a few clips here. And there's a practice exercise for this clip, so go check that out.
*/