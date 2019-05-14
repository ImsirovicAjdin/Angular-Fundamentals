import { Component, Input, Output, EventEmitter } from '@angular/core'
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div>Time: {{event?.time}}</div>
<div [ngStyle]="{
    'color': event?.time === '8:00 am' ? '#003300' : '#bbb', 
    'font-size': event?.time === '8:00 am' ? '50px' : '16px'
    }"
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
    .green { color: #003300 !important }
    .bold { font-size: 50px!important }
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
} 

/*

Styling Components with ngStyle
(1)
And just like you can apply a single class to an element with a class binding, you can also apply a single style to an element using a style binding. To demonstrate, let's replace this ngClass with the style binding. We'll just make the font green again if it's an early start event like this.
Okay, so this is going to set the color based on this ternary statement. If the event time is 8:00 a. m., then the color will be green. Otherwise, it'll be this gray color. So this should behave the same way as the previous ngClass binding, except that we're not applying the bold font weight. 
So let's take a look. If I refresh, there you can see it's green but it's not bold. 
(2)
Okay, so if we want to apply that bold class we'll need to use ngStyle. And to do that inline, it'll look like this. Okay, so this is a lot like ngClass, where we're returning an object. Only in this case the keys of this object or the property names of the object are styles like color and font weight and the values are a ternary statement that will set those values based on whether the ternary is true or false. And this will work like this but this is really a convoluted statement to have in a template. So let's go ahead and break this out into a function like we did with ngClass. 
(3)
So we'll replace this with getStartTimeStyle. And that will actually help make our logic a little more simple. So let's come over here. And we're going to replace this with getStartTimeStyle. And our if statements can be the same. But what we'll return is an object like this. Okay, so this is just returning an object with the styles we want. And font weight had to be put in quotes because it had a dash in its name. And then down here, we'll just return an empty object if the start time is not 8:00 a. m.. Okay, and because these two objects we're returning are different shapes, we have to set the return type of our function to any like this. Just to satisfy type script. Okay, let's go take a look at this. Okay, there we go. So we're now getting both of our styles applied though that function. And just like with ngClass, if we were to add a style directly to this element like this, then the styles applied with ngStyle are additive. So this style will always be applied and ngStyle would optionally apply any styles from that function. So let's delete this. And since we're using ngStyle now, we don't need these classes. And of course, we could've left ngClass and used that instead of ngStyle. But either one works fine. And there's a practice exercise for this clip. So go check that out.


*/