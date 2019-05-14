 // (2) of course, we need to import the input decorator
import { Component, Input } from '@angular/core'

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
    </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {
    // event:any
    // (1) If we have the above variable only, there's nothing to
    // tell Angular to expect a value to be passed into 
    // our component; that's where the @Input decorator 
    // comes in
    @Input() event:any // this 'event' corresponds to our [event] property in (4)
    // (3) This input decorator tells Angular that this
    // event will be passed in from another component
    // which is (4) in event-list.component.html
} 