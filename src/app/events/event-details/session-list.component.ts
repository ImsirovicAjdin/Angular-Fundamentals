// 8.2 (4) Alright, we'll have to import input and Isession.
import { Component, Input } from '@angular/core'
import { ISession } from '../shared/index'

@Component({
    selector: 'session-list',
    templateUrl:  './session-list.component.html'
})

// 8.2 (2) Passing data into a child component
// Alright, so let's go create our session list component. Okay and here's what that will look like. Okay so there's the session list selector that we used in our events detail component, and then this will use a separate template file. Alright, now we just need the component class,
export class SessionListComponent {
    //  8.2 (3) and then if we go back and look at our event details component html you can see that we're expecting there to be a sessions property on this session list component. So let's add that and that will be an input property.
    @Input() sessions:ISession[]

    constructor() {}

}