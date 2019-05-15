import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'
// 8.3 (15) Alright lets go import Isession. 
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
  constructor(private eventService:EventService, private route:ActivatedRoute) {

  }
  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }

  addSession() {
    this.addMode = true
  }
  // 8.3 (14) So let's go create our save new session method on our event details component. Okay, and a session is going to be passed into here, and it should conform to the Isession model.
  saveNewSession(session:ISession) {
    // 8.3 (17) Okay if you remember on our create session form the session id on this is going to be undefined. So we need to assign a new session id to this session when it comes in. So we'll the max session id off of the sessions in the event, and then increment it and assign that to our session id.
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    // 8.3 (18) Okay so this is calling math-dot-max with all of the session ids from the sessions array. So that should return us the maximum session id, and then we'll just set the id on our new session. 
    session.id = nextId + 1
    // 8.3 (19) Alright, and then we'll just add this session to the event. Okay so we're just pushing that onto the sessions array. 
    this.event.sessions.push(session)
    // 8.3 (20) Alright, and then we just need to call update event on our even service to save this event.
    this.eventService.updateEvent(this.event)
    // 8.3 (21) Alright, and then remember we're toggling an add mode for whether or not we are currently adding a session, and so let's toggle that back to false since we're done adding, and that should display the session list again.
    this.addMode = false
  }

  // 8.3 (27) Okay so we're binding to that output property on the create session component, and when it's emitted we will call cancel add session on our component so let's go add go a method for that, and all that needs to do is set add mode to false
  cancelAddSession() {
    this.addMode = false
  }
}
// 8.3 (28 - wrap up) Alright let's go check that out. So let's refresh our event details page, and we'll click on add session, and now if I hit cancel you can see it takes me out of add mode. Okay great, so that's a great example of how to use output parameters to pass data back to parent components.