import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from '../shared/index'
// 8.3 (2) So let's just add a style for that in our component. So we'll just say anchor tags should have a pointer cursor.
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
  addMode:boolean // 8.3 (4) Alright, and we'll need to define that property. 
  constructor(private eventService:EventService, private route:ActivatedRoute) {

  }
  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }

// 8.3 (3) Okay, and that link is calling add session on our component so let's create that method. Alright, and all this add session method is really going to do is put us into an add mode. So we're just going to toggle a flag on our component.
  addSession() {
    this.addMode = true
  }

}