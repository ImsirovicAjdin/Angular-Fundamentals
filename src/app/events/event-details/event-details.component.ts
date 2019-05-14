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
7.4
Using the data from your template-based form
(1)
Okay, so our login form is now providing the data that we need, so let's use that data to log the user in, but first we'll need a service that we can call that will do that for us. So let's create an auth service in our user module. So right here we'll add a new file, auth service, and just like every other service, this will just import an injectable class. Okay, and this service will have a login user method that will look like this, alright, and this service will keep track of the current user. So let's create a user model that we can use here also and that will just look like this. Alright, now let's just import that model into our service. Okay, now we can create a current user property on a class that will be of type IUser. Okay, now when we call login user, we'll make a call to the server and log the user in and then we'll set this current user property but we don't want to deal with all of that right now so we're just going to fake it out and set the current user to be John Papa. Okay, and it looks like we might have a problem with our interface, let's come over here, yep. This should be capitalized. It's really neat how using typescript allows you to see errors like that. Okay, so we're not really authenticating the user here, we'll wire that up in a later module. What we'll eventually do is pass the username and password to the server, let the server authenticate the user, and return the user's information that we will then set as the current user but for now this fake implementation will work and it gives us a service that we can call and we can worry about the implementation details later. For now when you call login user, it will just log you in and always set the current user to John Papa. Alright, while we're in here our app is going to want to know if we are logged in so let's add an is authenticated method that just returns true if the current user is set. Okay, that will do for our service. Let's not forget to register it, however, as a provider, this is going to be a little bit interesting. Remember over in our user module when we needed the forms module, we imported it here as an import in our user module and now we have a service that we need to register as a provider but we don't want to register it as a provider here in our user module, we want to do that in our app modules. That's because we're also going to be using it in components that are in our app module so we'll use it in both modules and that might make you wonder, why don't we need to register it in both modules? Well, that's because providers are shared across Angular modules. So if we add it in our app module, it will be available for us to use here without having to register it as a provider in this module. It's worth nothing that while this is true for providers, it is not true for imports and declarations. So you need to import those in whichever modules need them. Anyhow, let's go ahead and add the auth service as a provider in our app module. Okay, so we'll import it and then let's add is as a provider. Okay, now back over to our login component. When the login method is called here, we'll call our new auth service, let's import it and inject it and then we'll call it like this when login is called. Okay, so if you remember over in our HTML, when we submit the form we pass in the form's value, which has these two properties on it and then they're available here, we can pass them into the service. Okay, now let's just update our app so that we can tell when we're logged in and then this will all come together. So over in the HTML for our nav component, instead of just displaying welcome John here, let's display a login link if the user is not authenticated and a welcome message if they are. So first over in our nav component, let's import our auth service and then inject it down here and then back over here in our nav bar HTML, let's add a new login link right here and that will link to our login route. So let's add a router link. Okay, so that links to our new login form and then we only want to show this if the user is not authenticated. So let's add an ngIf to this and then we can access that auth service that we just injected right here like this. Okay, cool, so that will only show now if the user is not authenticated. Now let's update this profile link to only show when the user is logged in and then right here we'll just update it to show the current user's name. Okay, now if we go over to our app, and let's refresh, and then you can see up here we have a login link so if I click on that, and then log in, okay, now if I log in, cool, now you can see we're logged in. Alright, cool, so this is our first form and you can see how the data from our input boxes was wired up with ngModel and then how we passed that in with ngSubmit to our login method and then in our login method we called our auth service and passed in the username and password to log the user in. Next we'll take a look at some validation but let's just finish up a couple of loose ends here. First of all, when we log in, it is logging us in but it's leaving us on the login page, so let's get it so that it redirects us back to the all events page and then also if you hit cancel, it'll send us to the all events page. 

(2)
So let's import our router and inject it and then in our login method after we authenticate the user, we will route them back to the events page. Okay, and then let's wire up the cancel button so let's provide a method here and this will also navigate to the events page. Okay, let's go wire that up on our button so when we click on this button, we'll call our cancel method. Okay, so that should be working now, if I refresh here, now if I log in, then it logs me in, you can see I'm logged in now and it takes me to the events page and if I click cancel, it also takes me back. Okay, cool, now let's go add some validation.


*/