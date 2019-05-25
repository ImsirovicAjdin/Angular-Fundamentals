 /*
 12.04.02 Write the template for simpleModal.component.ts
 I'm using Camel Case here. A lot of times you'll see the recommendation is to use a hyphen, simple dash modal like that, and I have a personal preference to not use the hyphens, but either way you want to do it is just fine. And to start off with of course, we're going to be creating import component, so let's import component, and be sure and give the casing right on your import statement, and now let's create our component. We'll give it a selector, of course of simple-modal. And a template, and here in the template, we're going to need a div, and I'll give it an ID, because using the Bootstrap modal component, you have to know the ID of the modal itself, and well just give it an ID of simple-modal. And we give it a class of modal, which actually tells Bootstrap and jQuery that this is a modal, and we want to class of fade, so that when it closes it'll fade out, and a tab index of negative one, and inside of that, we have another div, which has a class of modal-dialog. This is for styling. And then within that, a div with a class of modal-content. Again, for styling, and within that, a modal header with div, and inside the header, I want to close button, so I'm going to create a button, of type-"button", and I give it a class of close, and I'm going to add a data-dismiss tag, to say that I want to dismiss my modal, and then within that, I want a span that shows a little x, so I'm going to use the ampersand times HTML character, and then close my button, and because of the styles, that button will be shifted over the right. I also want an h4 with a title in it, more styling classes there. And we'll bind to that title property that we set inside of our NavBar HTML right there. Close up that div, and we'll add another div for the modal body, and here is where we're going to project our content, so I'll just add in the ng-content tag. Close up this div, and that div, and another, and finally our last, closing div. So there's our HTML. Now we've got to style this up a lot, so I'm going to include some styles in this component. I want these styles to apply to this component only. And we're going to add a modal body with a height of 250 pixels, and an overflow-y of scroll. The rest of the styles are specified in the Bootstrap CSS file. Now we've got the styles for our component, and we can create the component class itself, and that has one input property, which is the title, which is a string, and let's go up and bring in the input, and that will be all that we need for the modal component itself. We're still not actually calling an opening of the modal component, but we'll do that in the next section, so let's save this, and go into our index file, and add that line. And again, you can see here, the recommendation is often shown to use a hyphen to separate words. Here we've done Pascal, so you can make your own decision. Do you like the hyphenated better? Do you like the Pascal case better? I myself have a small preference for Pascal case, but the hyphenated case is starting to grow on me. And with that in the barrel file, we can go into our app module, and add in our simple-modal component, and with that we can save our changes, and then we of course add it down to our declarations. We're not yet using jQuery, but we will be in our next section, so let's go ahead and add jQuery to our providers list as well. And with that we'll save our changes.
 */
import { Component, Input } from '@angular/core'

@Component({
    selector: 'simple-modal',
    template: `
        <div id="simple-modal" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                            data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title">{{title}}</he>
                    </div>
                    <div class="modal-body">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body { height: 250px; overflow-y: scroll; }
    `]
})
export class SimpleModalComponent {
    @Input() title:string; 
}