import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

@Component({
    selector: 'simple-modal',
    template: `
        <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                            data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body" (click)="closeModal()">
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
    @Input() elementId: string;
    @ViewChild('modalcontainer') containerEl: ElementRef; 

    constructor(@Inject(JQ_TOKEN) private $: any) {}

    closeModal() {
        console.log('closemodal');
        this.$(this.containerEl.nativeElement).modal('hide');
    }
}
/*
12.09 Using the @ViewChild Decorator
In this section, we're going to address the fact that when you open up the modal dialog, and click on a session, it doesn't close the dialog down for you. So what we want to do is add a click event handler to this main body of this dialog box here, and listen to that, and close the modal when that's clicked. So we'll go back to our code, and it's right here in this modal body. That's what we want to listen to. Also there's a mistake here. This is supposed to be modal-body, which should also fix some styling issues. We want to listen to this div, and whenever the user clicks on it, we want to close the dialog box. So, let's implement a click event listener here. And we'll just call it closeModal. And of course we're going to need to implement that method, and inside of here, ultimately we're going to call that jQuery method modal, and we'll just pass in the string hide, and that will close down the modal dialog, but we've got to pass in the actual DOM node, the raw DOM node, that is the modal, which is going to be of course this div right here, that has the modal class. So how do we get a handle to that? Well, we could do the same thing that we did in modal trigger. We could get our element ref, and just get the native element off of it, and that would be fine, but we're going to look at a different way to get access to that same DOM node. And this is through using a view child. So I'm going to go up to my @angular/core, and I'm going to import ViewChild, and down here, I'm going to call that, it's a decorator @ViewChild, and you pass into the view child a string that indicates an Angular 2 local ref variable, so you may remember previously that if you want to refer to a specific element, you can put in a ref like this. These refs are available inside of code, so I could for example pass it into my closeModal, but it's also available as an indicator for a view child. So if I pass in the string modalcontainer, and I'm going to call this my container element, which is an element ref, and I need to import that element ref type for @angular/core. This object here is going to be initialized with this component to point at this specific DOM node. Again, it's just a wrapper to that DOM node, but it's going to point to it, so it's kind of the same as injecting an element ref in the constructor, as we did here for ModalTrigger, but it's a little bit more versatile, because we can put this ref on any node that we want to, and it'll just give us a handle to that node. In this case, we just want the wrapping node, so that's fine. It's going to be the same either way, but we're going to implement it using a view child, and that'll show us how those work. So I don't have jQuery yet. I need to import that as well, and we'll have to create a constructor. @Inject(JQ_TOKEN), and we didn't import inject, so let's import that. So now we got jQuery, and of course it'll be this, and now we want the raw DOM element that this container El wraps, so we call this. container. El. nativeElement, and we're getting the underlying DOM element that this container El points to, which is found by looking up the ref for modalcontainer. So that's another way of accessing a specific DOM node. And it's a much nicer way to get ahold of a specific DOM node, rather than getting the parent element ref, and then perhaps drilling down through something like getting elements by class name, for example. So let's save our work, and we'll go back to the browser and refresh, and now if we click on a session, it does close the modal dialog for us. Now, in addition to view child, which we're using here, there's a few more variations on this. There's view children, R-E-N, which we didn't import, but is one of the options. View children would be used in case you have a list of elements that all have the same ref, for example, if we had an ngFor that was iterating over a list of items, and we wanted to get a reference to that entire collection, we would use view children for that. Then, if we wanted to access a child that is inside the content, that's projected into this component, then we wouldn't use view child. We would use content child. Now, the problem with content child is you have to trust that whoever implements the content that's getting projected is going to put in the elements that have the ref on them. So if they don't do that, then your content child is going to be empty. And in the same way that view child has view children, content child has content children. And that does the same thing as view children. If the projected content has a list of refs that you want to get a hold of, then you would use content children. And so those are ways that you can get access to a specific DOM node, without starting at the top and drilling down. And there is a practice exercise for this clip, if you want to do that now.
*/