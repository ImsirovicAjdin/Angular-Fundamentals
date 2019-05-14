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

*/