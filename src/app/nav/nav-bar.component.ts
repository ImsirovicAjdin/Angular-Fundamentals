import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession } from '../events/shared/event.model'
import { EventService } from '../events/index'
import { $ } from 'protractor';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924; }
  `]
})
export class NavBarComponent {
  searchTerm: string = "";
  foundSessions: ISession[];

  constructor(public auth: AuthService, private eventService: EventService) {

  }

  onSearch() {
    $('#id').modal()    
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    })
  }
}
/*
12.06 Creating Directives - The Trigger Directive

12.06.01 We don't want to tightly bind the NavBar component to the implementation of opening up a modal
We've got our simple-modal component created, but now we need to show it when somebody searches. So we need a trigger and a way to open up that modal. The way that you open up that modal in code, Let's just go and do a random piece of code here, would be with jQuery, and in jQuery you call the jQuery selector. You have some DOM element that you're selecting inside of here, say an ID, and then you call the modal method, and that's essentially how we open up the modal. So we need to call this code when the user searches, so when they click the search button here. Well, what we don't want to do is go into our NavBar and go into this button and add a click event handler to this and say, hey, when the click event happens, then let's call that code. You know, we put it into a onSearch method. And we would call that modal and open it up. That's not what we want to do for one very big reason. That would tightly bind this NavBar component to the implementation of opening up a modal, right? I mean, this is really under the hoods, is having jQuery call its modal method, which is only there because Bootstrap is also part of what's getting loaded. So we don't want that. We want to hide these implementation details behind something else, and a great way to do that would be a directive. So instead of this, let's just undo these changes here, 
*/
