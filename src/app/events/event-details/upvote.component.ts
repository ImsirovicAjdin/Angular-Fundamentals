import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'upvote',
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
            </div>
            <div class="badge badge-inverse votingCount">
                <div>{{count}}</div>
            </div>
        </div>
    `,
    styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent {
    @Input() count: number;
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    };
    @Output() vote = new EventEmitter();
    iconColor: string;

    onClick() {
        console.log(this.count);
        this.vote.emit({});
    }
}
/*
13.05 Using @Input Setters
Now I'll make one small change to our votingWidget. Right now it goes from an empty heart to a full heart when you vote, I'd like to change that to go from a white heart to a red heart when you vote. So let's go back into our code, and it's here in the votingWidget, this upvote component right here, where we need to make that change. So here is where we got the glyph icons, whether it's heart or heart empty based on whether they voted or not. I want to change that, I'm just going to use the glyph icon of heart, I'm going to get rid of this heart empty, but I'm going to bind to the color property of style, so really what I want is, I want style to have a color of red if they voted, and have a color of white if they haven't. So therefore I want to be able to set the color property of the style for that icon. And I can do that by binding to style dot color. And I can set that equal to some value that exists inside of my component. I'll create a new property named iconColor and that way I can set iconColor as a string to either white or red, and I would want to set that based on whether or not they had voted or not voted. Now I could do this by adding an onChanges lifecycle handler like we've done in the past, and since it's an input property, every time it gets a new value, I'll see the value and I can react to it, if it's voted I can change it to red, if it's not voted, I can change it to white. But there's an easier way to do this. We can use a setter on input properties. I'm going to get rid of this iconColor, and for this voted property, I'm going to add the word set. And then this now becomes a function which takes in a parameter which is called val. And that has a body, and I can set this dot iconColor equal to val, if it's true, then we go to red, and if it's false then we go to white. And I do need to create that iconColor property but this would be public not private. And I want to initialize it here, because it get initialized here on this line. And since the icon is visible all the time, we no longer need this ngIf, we can get rid of that. And we can save our changes, go back to the browser. We'll refresh, of course, need to log in. And now if we click on the heart, it changes from white to red. And that's how you can use input setters in order to create a derived value from an input property.
*/