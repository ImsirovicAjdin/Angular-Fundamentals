// (4) Import the Output decorator and the EventEmmiter
import { Component, Input, Output, EventEmitter } from '@angular/core'
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event.name}}</h2>
      <div>Date: {{event.date}}</div>
      <div>Time: {{event.time}}</div>
      <div>Price: \${{event.price}}</div>
      <div>
        <span>Location: {{event.location.address}}</span>
        <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
      </div>
      <button class="btn btn-primary" (click)="handleClickme()">
        Click me!
      </button><!-- (1) add click event binding -->
    </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {
    @Input() event:any
    @Output() eventClick = new EventEmitter()  // (3) output the eventClick to a new EventEmitter
 
    handleClickme() { // (2) handle the click event binding 
        // (2b) alert('clicked!')
        this.eventClick.emit('foo') // (5) Emit an event with the EventEmitter each time a button is clicked; we can pass data along with this event too; for now, let's just emit the string 'foo'
        // (6a) Alright, so now our component is emitting data,
        // let's make our parent listen to that
    }
} 