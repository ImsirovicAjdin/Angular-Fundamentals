import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {

    events:any[]

    constructor(private eventService: EventService) {
      
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

}
/*
(1)
Creating Your First Service
Before we jump in, I just wanted to remind you that we've made changes to this course to keep it up-to-date. This course was originally created without the CLI, since it was still in beta. 
Because of these updates, you may notice some inconsistencies in the file explorer over here. Those inconsistencies have been explained previously. Okay so as we've seen our EventsListComponent has all of our data hard 
coded right here. Eventually we will be getting this data from an API and we could just add that API call right here in our component but then our component starts to take on too many responsibilities. We'd really like to just let another service take care of the details of making that HTTP call. It would be nice if we could just call a function here and not worry about the implementation here in our component. So let's create a service that 
will take care of that for us. Alright so inside our events folder, we will create a new folder called shared where we can put some shared elements. And then in that folder we'll create a new typescript file for our service. Okay so in here, we're going to create and export an eventService class. And it will have a method on it to retrieve the events. Alright so eventually this GetEvents method will be the thing that will make the Ajax 
call to fetch the events from a server. But we'll get into that later. For now, let's just hard code the events and return them directly. So let's grab them out of our EventsListComponent. We'll just copy this array out here and delete this and then over here in our service, we will just add it as a constant down here. Okay and then we'll just go ahead and collapse that so it's not distracting, and then we'll just have our getEvents method 
return those events. Okay so here we have our service. It's just a class and technically, this is all we really need. We could now inject this service into our component or other services. But it's always a good practice to mark services as injectable like this. Adding this injectable decorator is important for any service that you're going to inject into your components or another service. And it's important that you don't forget to put parenthesis on the end of here like this. That's an easy thing to forget. This injectable decorator isn't really required for this service. Because this decorator is only required when you inject a service which also injects other services as dependencies of its own. Just to clarify what I mean by injecting a service, I don't mean imports. I mean if you have a constructor that injects services like this. So now that this eventsService injects the HTTP service. This injectable decorator is required. And since you never really know if a service is going to take a dependency later, it's just a best practice to always add it. We don't need this HTTP dependency yet. So let's undo that but we will leave the injectable decorator even though it's not technically required yet. So now we just need to let our app know that this service exists. We do that by registering it in our app module. First let's fix this spelling error. Then we'll come over to our app module and we'll import it. And then we will add it as a provider down here. Okay now that it's registered as a provider, Angular's injector is aware of this. So whenever we request it in another component or service, Angular will know where to go to get this service. Alright so now Angular knows how to inject this. Let's go ahead and inject it into our EventsListComponent. So we just do that in our constructor like this. Okay cool, so we'll just have to go ahead and import the EventService. Okay that's all there is to injecting a service once it's registered. Remember this private syntax right here is shorthand for saying essentially that we have a property on our class like this and like we are saying this. eventService equals eventService. This is short hand for that syntax essentially. So angular will look at the constructor for this component and see that we want an eventService and it will go out and construct that or grab it from the injector and inject it in right here. So now what we have to do is use it and we'll just do it in our constructor for now, which is a bad idea but we'll come back to that and fix it later. For now, let's just add it right here. Okay we need to declare this events variable. We will just declare it as an array of any data type. Okay cool so let's go take a look at this. First, let's make sure our server is running. Okay now let's come over to our app and refresh and this should still work just fine. So this is working great. Now back in our component, remember I said it's not a good idea to put this in our constructor. It's really not a good idea to put things in your constructor that are potentially long running. And eventually this will be an ajax call. And so this will take a little while to fetch those events. So we really shouldn't do it in our constructor, and yet we need to have this happen when our component first loads. So where we can do this, if not in the constructor? Well components have lifecycle hooks that you can hook into and one of those is the ngOnInit method. So that lifecycle event is called when the component is being loaded. So let's create an ngOnInit method. And then let's move this code into there. Okay we still need our constructor even though it's not doing anything in the body because that's where our service gets injected. But then we can access the service elsewhere in our class like we are here in ngOnInit. This will work just fine if we go over and take a look and refresh here. This is still working great. Only it actually fetched that data in the ngOnInit event. And then just as a side note, we can also take advantage of some Angular typescript declarations and let typescript know that this component implements ngOnInit like this. And then we just need to import OnInit. Okay cool now if we were to remove our ngOnInit here, we would get a warning indicating that it should be implemented because we are implementing it here on our class. So we can just add that implementation and then we're getting a little bit of typescript compilation safety. Okay cool. Now we have a functioning eventService and there is a practice exercise for this script. So go check that out.
*/