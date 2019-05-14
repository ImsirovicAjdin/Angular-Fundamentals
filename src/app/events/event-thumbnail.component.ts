import { Component, Input, Output, EventEmitter } from '@angular/core'
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div
      [routerLink]="['/events', event.id]"
      class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div>Time: {{event?.time}}</div>
<div [ngStyle]="getStartTimeStyle()"
    [ngSwitch]="event?.time">
    <span *ngSwitchCase="'8:00 am'">Early Start</span>
    <span *ngSwitchCase="'10:00 am'">Late Start</span>
    <span *ngSwitchDefault>Normal Start</span>
</div>
      <div>Price: \${{event?.price}}</div>
      <div [hidden]="!event?.location">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
      <div [hidden]="!event?.onlineUrl">
        Online URL: {{event?.onlineUrl}}
      </div>
    </div>
  `,
  styles: [`
    /* .green { color: #003300 !important } */
    /* .bold { font-size: 50px!important } */
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {    
    @Input() event:any

    getStartTimeClass() {
        if (this.event && this.event.time === '8:00 am')
            return ['green', 'bold']
        return []
    }

    getStartTimeStyle():any {
        if (this.event && this.event.time === '8:00 am')
            return {color: '#003300', 'font-size': '50px'}
        return {}
    }
} 
