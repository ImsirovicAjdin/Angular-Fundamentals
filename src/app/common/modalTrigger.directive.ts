import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit  {
    private el: HTMLElement;
    @Input('modal-trigger') modalId: string;

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $ : any ) {
        this.el = ref.nativeElement
    }
    
    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })
    }
}
/*
12.07 Binding an ID
Now even though our new modal component with its associated trigger directive are now working, we do have a few enhancements that we need to make. So the first enhancement that we're going to handle is the fact that there's a weakness that because we're using an ID, and in our trigger, we're saying, hey, open up this modal with this ID, we could never have two different modals in the same application. We could only have one modal, which is a weakness, right? This is a generic modal dialog box. We'd like to be able to use it multiple times. But right now we're fixed to just one, because this ID is here, so if we place more than one on a given page, we'll have two elements that have the same ID, and therefore we're going to have a problem. So let's fix that. Let's make the ID customizable. So what I want to be able to do is tell this component what its ID is going to be. And I'd like to do it like this. I'd like to go into the NavBar component, and where I've created the simple-modal, in addition to the title, it'd be nice to just set its element ID, and we'll just call this one searchResults, but an entirely different modal that we might create, say maybe on the NavBar, maybe somewhere else, it might have an element ID of say, userList. Whatever. So here's our property that's set. Since this is a component, this is an input property. Let's go back to our simple-modal, and we're going to create an input property for the element ID, and now we've got that input property, and we can bind it here in the template. So instead of setting this to simple-modal, we'll bind this to elementId. Now we've got that set up, so that the NavBar's template is setting the element ID, and the simple-modal is using that element ID that it's given, but the trigger is still hard coded to this value. So we need to tie these two together. Now there is an easy way. I can't just globally select for that somehow or somehow inject this into the modal trigger, but what I can do is go back to my template where I'm defining the modal trigger, and I can pass in the same ID as the value of the attribute. And this is actually really nice, so here I've set the element ID to searchResults, and here, the modal trigger, I'm saying, you are the modal trigger for this particular modal dialog box. That's really great because now on the HTML, it really tells me what's going on and it adds that sort of binding between the two things, so if I have an entirely different modal dialog box down here with a different element ID, then somewhere else I have a different trigger set to that ID, I can tell which button triggers which modal. Now when we created this attribute, the element ID, we just created an input property. Here, this is a directive, not a component, but we implement it the same way. We go into our modal trigger, and we are going to add an input property, so we got to bring in @Input, and the name of this input is the name of the attribute, which is just modal-trigger. And fortunately, modal-trigger isn't going to work as an identifier name, because dashes aren't allowed. So we've got to alias this. And there's an easy way to do that. Take this, and we put it inside the input as the parameter, saying hey, this is the variable that's coming in, or this is the attribute value that's coming in, but I want you to assign it to a property named, and we'll call this modalId, which is a string, and now that I've got this modal ID, I can use that instead of the hard coded string simple-modal. So, instead of con cat ______, let's just do a little bit of fun, turn this into an ES6 interpolation string, and we use this. modalId. So now our resulting string is going to be hashtag, and then the modal ID, and let's save our changes, and in the template, and we can go back to the browser, and refresh, and let's search for pipe again, and our modal dialog is still working. We can still use it to navigate to the right session.
*/