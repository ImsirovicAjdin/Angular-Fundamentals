import { Component, Input, Output, EventEmitter } from '@angular/core'
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div>Time: {{event?.time}}</div>
<div [ngSwitch]="event?.time">
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
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {    
    @Input() event:any
} 

/*

Okay, so we've shown how to change the visibility of elements using ngif and by binding to the hidden property of a DOM element. 

But what if there's a part of our document that we want to change based on multiple possible values of an expression? 

That's where ngSwitch comes in. So let's add something to our event that will tell us whether the conference starts earlier or later based on the event time. So we're going to add a div right here. And inside that div we'll have three spans. One that says early start. One that says late start. And then, another one that says normal start. Okay, and then we want to show and hide these based upon the event time. So I'm going to add an ngSwitch up here and that'll just get bound to the event time. 

And notice for ngif and ngSwitch and other things, we also have to use the safe navigation operator to guard against nulls. 

Okay, so now I have a ngSwitch that is bound to my event time. Now, on my spans, I just need to add ngSwitch case statements. And then I set this to the value that should allow early start to be displayed. So, in this case, I'm going to bind this to the value of 8:00 a. m. Okay, so this span has an ngSwitch case directive that is bound to the string value of 8:00 a. m. Let's do the same thing for these others. So, for late start, we will bind it to the value 10:00 a. m. And then for normal start, this will be our default case so if 8:00 a. m. doesn't match and 10:00 a. m. doesn't match then this will be displayed. And we do that with ngSwitch default. Okay, so now we have this div that's bound to our event time using ngSwitch and the cases are early start, late start and normal start with normal start being the default. Okay, so let's go take a look at this. So I'm going to refresh my page here. Okay, so cool, you can see that this one that starts at 10:00 a. m. says late start. This one that starts at 9:00 a. m. says normal start. And this one that starts at 8:00 a. m. says early start. Okay, cool, that was easy. Now we would like these values to show up right after the time. So let's go over and take a look at our HTML here. So they're showing on a new line because this is a div not a span. Really we want this to show up right after the time up here on the same line. So just to demonstrate there's nothing special about this ngSwitch. It doesn't have to be on its own div. We could take this and move that up here like this. And then we could move these spans up here and delete this div. And since this will be displaying right after the time, let's add some parentheses around it. Okay, let's go take a look at that. Alright, cool, so now that's showing up on the same line. Now our ngSwitch example here is using event time which is a string. And so the ngSwitch case values are also strings. Notice that they are wrapped in apostrophes. But ngSwitch doesn't have to work with strings. It can be any data type. And in the ngSwitch case statement expressions should also return the same data type. And that's all there is to using ngSwitch. And there's a practice exercise for this clip so go check that out.

*/