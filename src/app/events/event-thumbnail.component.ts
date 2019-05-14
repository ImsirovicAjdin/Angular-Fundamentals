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
        // (1) Making things more interesting by emitting some actual data from our child component: the name of the technology event that's displayed in the event thumbnail; 
       //(1) here we're receiving in our conference event
        //     |          
    @Input() event:any // (2) our conference event has a name property on it
    @Output() eventClick = new EventEmitter()
 
    handleClickme() {
        this.eventClick.emit(this.event.name) // (2) so let's just log that name property out
    }
} 