import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../shared/index' 

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height: 100px; }
    a {cursor:pointer}
  `]
})
export class EventDetailsComponent {
  event:IEvent
  addMode:boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService:EventService, private route:ActivatedRoute) {

  }

  addSession() {
    this.addMode = true
  }

  saveNewSession(session:ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1
    this.event.sessions.push(session)
    this.eventService.updateEvent(this.event)
    this.addMode = false
  }


  cancelAddSession() {
    this.addMode = false
  }

  ngOnInit() {
    //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])

    this.route.params.forEach((params:Params) => {
      this.event = this.eventService.getEvent(+params['id']);
      this.addMode = false;
    })
  }

}
/*
12.08 Routing to the Same Component
The next feature that we're going to add is to actually fix a bug. Now this is not a bug in the modal dialog component we created. It's the modal dialog that's exposing a bug that has already existed in our event details page. Let's look at the bug first. Then we'll talk about why it exists and how we handle it. So I'm going to search again, but I'm not going to put in any search term. I'm just going to click the search button, which will search all sessions. We can see I've got every session here, so I'm going to click on the first one, which is a session for the Angular Connect event. And you can see the URL is /event/1. Now if I click on the same one, it just stays there. That makes sense, because it's still the same event. In fact, all this first set of sessions belongs to the event that has ID of 1. So let's go down to the bottom. These sessions down here belong to a different event. So I'm going to click on one of those, and you'll see at the top that the URL has changed. Notice that it's now /event/4. Yet, we have not navigated away. We are still looking at Angular Connect. So we are still looking at the event that has an ID of 1. If I were to go up here and just hit enter, and navigate to the fourth event, we can see that it's actually the UN Angular Summit. The event with ID of 1 is Angular Connect. The event with ID of 4 is UN Angular Summit. Yet, when we try to navigate away, like I just did right now, the URL changes, but the event does not. This is a bug in our event details component, and let's talk about what's going on. We'll go look at our code, and we're going to look at the event details component. I'm going to close these down. Here in events, in details, the event details component, down here in the OnInit, we set the current event to be equal to the event service getEvent, but we're passing in this. route. snapshot, and then the parameter 'id, ' so the ID parameter from our route. That's great, the first time this component initializes. But when we navigate from /1 to /4, what Angular does not do is reset the entire state of the component, and reinitialize it, reconstruct it. No, it stays there. It leaves the same component initialized. Instead, all that happens is that the param for the ID changes. It's taking advantage of the fact that parameters for your route are actually exposed as an observable. Here we're using the snapshot, which is not an observable. We've told it, just grab whatever the current route's parameters are, create a snapshot of that, a fixed copy, and we'll use that, but we're not subscribing to any changes, so if that ID parameter changes, we don't know about it. And that's the bug that we've got to fix. That's how Angular 2 does its routing, When you're on a parameterized page, so a page that like our event details page, that has an ID and the URL, and whatever is displayed changes based on this ID in the URL. If we can navigate from this page to itself, to a different ID, then we got to listen to the route parameter subscription. That's the way we deal with that in Angular 2. Now it didn't matter when we were going from all events to any given event, like 2 is different than 1, because we're navigating from a different component to the event details component. But when we're in the event details component, we navigate to itself just a different URL, then the route parameters are changing, and we're notified of that through an observable. So, in order to fix this bug, we've got to subscribe to the route parameters, so we're going to completely change how this code works. I'm going to put the code right here so we can refer to what the code used to look like. Instead of setting this. event equal to something, we're going to class this. route. params. forEach, and we're getting in a params object, which is of type params, and we have it inject that params type, so let's go up and inject that. That's actually on the router, and the callback function will actually do the setting. This. event will be set equal to this. eventService. getEvent, and here we can just call params 'id, ' but we want to make sure and convert that from a string to a number, so we're going to use our little shorthand version. And now we can get rid of this code, and if we save our changes and go back to the browser and refresh, we're now going to get correct functionality. If I go down to a session for a different event and click on it, you can see that we've actually navigated and are displaying the data for the correct event. Now it's important to understand how this works and what's going on. We are not resetting this component, so therefore its state is not getting set. Here I'm resetting the event property, but this component actually has more state than just event. For example, the adMode. That's another piece of state. You can see if I go in here and click Add Session, I'm now in the adMode. So adMode is set to true. If I were to search, and go to one of the sessions for a different event. I've now navigated to the different event, but I'm still in adMode, which is probably not what I want. So in addition to setting the event, I probably need to reset back to my default adMode, which would be false. So it's very important to understand that whenever you are subscribing to the route parameters, and basically using that as navigation to a different page within the same component, you need to keep track of all the different pieces of state that exist in the page, in this case adMode. It's often easy to tell just by going up here and looking at what properties exist. Normally your state's going to be in these properties, so the event is a piece of state. AddMode is a piece of state. How we're filtering and sorting, those could also be pieces of state as well. We might want to reset those as well. I'm not going to do that, but again, that could be something that you might want to reset. So it's important to keep track of all this state, and reset it whenever you subscribe to and react to a route parameter change. And of course we could be resetting so much state that instead of calling this code, we might create new method called set state or reset state, and put the code into that so it looks a little bit more descriptive. So let's save our changes, and verify that our fix worked. Refresh. I'll turn on the adMode, go to a different event, and you can see adMode is now off. There we go. We fixed our bug, and we've learned how to deal with routing a component to itself. There's also a practice exercise for this clip. Feel free to go ahead and do that now.
*/