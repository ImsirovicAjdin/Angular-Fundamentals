import { Component, Input, Output, EventEmitter } from '@angular/core'
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div>Time: {{event?.time}}</div>
<div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
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
        return 'green bold'
    }
} 

/*
(1)
Styling Components with ngClass
There are a couple of ways to conditionally add CSS classes to elements with Angular and they're both pretty easy. 

Class bindings are good if you're wanting to toggle a single class. 
And the ngClass directive is better if you're wanting to toggle multiple classes. 

So let's take a look at class bindings first. Let's make it so that the start time of event turns green if it is an early start event, meaning it starts at 8:00 a. m. Okay, so on this div that surrounds the event time, we're going to add a binding that looks like this. Okay, so this looks a lot like a property binding. But there is no property class. green on a div. So what is this? This is a special type of binding called a class binding. And it is parsed by Angular and it's basically saying that if this expression event. time equals 8:00 a. m., returns true, then add the green class to this div. Okay, so let's add that class to our styles and then take a look at it. Okay, I'm using important here because otherwise this style will get overwritten by another one. This has nothing to do with the fact that we're using a class binding. It's just the nature of the CSS that exists in our app. And I could make this CSS binding a little more specific and not use important. But we'll just do it this way for now. So let's go take a look at this over in our app. Okay, cool, you can see that time is green only for the 8:00 a. m. event and not for the others. So this is working great. 

But what if we also wanted to add a second class, say a bold class to this element? That's where ngClass comes in. 

(2)
Let's create a bold class. And then we'll use ngClass to add both the green class and the bold class. We can do that with an ngClass expression like this. So instead of a class binding, we'll use ngClass. And then, here, we'll return an object. And that object will have two properties on it. One for each class we want to apply. So the first one will be green and then it'll have an expression that looks like this. Okay, so this ngClass expression will apply the green class if the event time equals 8:00 a. m. And then let's just apply a second class and we'll use the same expression here but we could use a different one. Okay, 

so the ngClass binding is going to expect an object where the object keys are the names of the classes you want to add and the values are a Boolean expression that determines whether or not that class should be shown. 

So this will add the green class and the bold class if the event time is 8:00 a. m.. So this should be working. Let's take a look. Okay, cool, so now both the green and the bold classes are being applied to this element. Okay, if we come back over to our code and we look at this expression that we've applied for ngClass, it's starting to be a lot of logic to exist in our template. 

(3)
So, instead of this, let's actually call a function on our component. Alright, now let's add that class to our component or that function. Alright, and then, rather than running the calculation twice, let's run it once and assign it to a constant. 

Okay, now we can just return our object. Okay, cool, this should be working the same. And it is. And then, I had said earlier that ngClass expects an object to be returned. That isn't exactly the whole truth. You can actually return an object like this or you can return a string, which is space separated list of the classes you want applied. Or you can return an array of strings, which represent the classes you want to apply. 
(4)
So let's see how this would look if we were going to return a string.

So basically we would replace this with an if statement. And then inside here, we would return a string with the classes we want applied if this is true. And otherwise, we'll return an empty string. Alright, so this should be working too. Great. And then the last thing that we could do is 

instead of returning a string, we could return an array or an empty array.

Okay, and that should work just fine too. Cool, so you have various different approaches that you can use here depending on the needs of your application and your particular style. And then one last thing that I want to mention here. What if on the element that you're adding ngClass to or doing a class binding on, what if this already had a class applied to it? Something like this. Well, that's okay actually. What would happen here is the well class would always be applied to this div. And then any classes that are applied conditionally with ngClass will be added in addition to this class. And that's true for both class bindings and ngClass. And so that's the two different ways you can apply classes to elements. And there's a practice exercise for this clip. So go check that out.

*/