import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';

declare let toastr

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {

    events:any[]

    constructor(private eventService: EventService, private toastr: ToastrService) {
      
    }
    /* 
    The above is shorthand for saying:
    
    eventService
    constructor(private eventService: EventService) {
        this.eventService = eventService
    }

    */
    ngOnInit() {
      this.events = this.eventService.getEvents()
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName)
    }

}
/*
Wrapping Third Party Services
It's pretty common in web applications that will want to use third party libraries or components. Let's take a look at how we might take something like that and turn it into an injectable service in Angular. To demonstrate that we'll use toastr. Toastr is a JavaScript library that allows you to create popup notification messages like this. Notice this message here. So let's see how we have to use this in our application. First we'll need to MPM install toastr. So we will come over to our Bash console and stop our server and then we'll just run this MPM install command. 

npm install toastr --save

Okay so that MPM module that we just installed gives us a style sheet and a JavaScript file that we need to import. So let's go import that. So over here in our Angular CLI JSON file, right here at the top of the styles we'll import the toastr styles. And then down here in the scripts, we'll import the toastr JavaScript file. Okay so now toastr will be loaded with our app, but the question is how do we make this consumable as an Angular service and use it in our components? So let's make it so that when you click on this event thumbnail, we display a toast message that shows the name of the event that was clicked. So first let's wire out the click event. Okay so we have this event available to us here because we're looping over all the events in this NG4. So this will appropriately wire up this click event for each event thumbnail and pass in the appropriate event. name when you click on that thumbnail. Now let's add this method to our component. Okay so that click handler is now wired up to this handle thumbnail click method. So now we just need to display the toast message inside this method. So when we load a toastr in the Angular CLI config that made it globally available. So we could just call it right here like this. Now you can see here that our IDE is complaining because it knows the typescript is not going to compile this. That's because even though toastr is available globally typescript doesn't know about it and so it thinks that this is an undeclared variable. So we just need to declare that up here like this. This just lets typescript know that this variable is in scope already declared somewhere else. So you come over here and refresh this. When I click on one of these, you can see I get a toast with a name of that event. So that's working but there are a couple of problems here. First of all, we are using a global reference for this toastr object. And using global objects is never a good idea. And then finally another problem is that this is not testable. Since we are not injecting toaster into our component, we can't mark it and so that makes it difficult to test this component. So let's take a look at how we would create an angular service around this that we can inject. Alright, so we'll create a toastr service and it really doesn't belong in this events folder. So let's create a common folder for items that will be shared commonly throughout the app. And then we'll create our service here. Alright, so in here let's create a toastr class and let's make that injectable so that Angular knows about it. And as always don't forget these parentheses here. Okay now we basically want to wrap each of toastr's methods. It has four methods that we are interested in. The first method is called success and you call that like this. So you pass in a message and title. Let's create a method on our service to wrap that like this. Okay so now we have a success method on our new toastr service. We didn't have to name this success of course. We could call it anything. The important part is that we are calling success on the toastr object. We still have a problem here. A compiler still doesn't know what this toastr object is. We're just going to tell typescript not to worry about that. And you can do that by declaring a variable like this. So this will tell our typescript compiler that toastr is an object that we know about and in this case, it's something on the global scope. But now at least accessing our global scope is limited to this class and we won't be using it all over our application. Okay now let's go ahead and wrap the other toastr methods. Okay cool, so now we have an injectable toastr service. Alright so this service is ready to use. Let's go back over to our eventsListComponent. We're going to have to import it. And now we can just simply inject it down here and then down here, we will use our injected toastr service and now the step that's easy to forget. We need to add our toastr service to our app module. So we'll declare it as a provider here and then we'll have to import it. Okay that should do it. Let's see if that's working. Let's refresh and click on our events and there we go. We're getting our toastr messages. That's working great. So now we aren't using a global variable in our code anymore. Typescript is happy and our code is much more testable than it was.
*/