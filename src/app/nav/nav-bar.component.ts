import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession } from '../events/shared/event.model'
import { EventService } from '../events/index'

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

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      //console.log(this.foundSessions);
      alert(this.foundSessions);
    })
  }
}
/*

12.02.02 Subscribe to observable in searchSessions() function definition
Now we've got to add those properties to the component. So, we need our search term, which is a string. And we'll initialize that to an empty string. And we're also going to need a search sessions method, which I'll create right here after the constructor. That takes in that search term, remember. And ultimately, our search is going to return to us a list of found sessions, so I'm going to need a found sessions property as well, which will be a collection of ISessions. And let's import the ISession interface. And now, we need to think about implementing our search sessions method. Obviously, we don't want our component itself to be doing our search. We want a service to handle that. So, we're going to use the event service. Seems like a natural place to put functionality like this. But that also means that my NavBar component needs to have a handle to an event service. So we'll have to import that, and now we can add it to the constructor. And once that's in place, we can call it inside of our search service method. And we want to call a method that will search through the sessions. That method doesn't exist yet, but I know what it's going to look like. I'm just going to call it searchSessions. And it's going to take in that same term. And I'm going to make this return an observable. Since we have our data locally, I could just return the data synchronously, but in the next section we're going to be adding in HTTP, and in a real application, you probably wouldn't have all your data locally. You'd probably be making an HTTP call for something like this, so an observable is fairly appropriate. So, we'll subscribe, and we'll probably receive back a list of sessions. And once we get back the list of sessions, we'll set our found sessions variable equal to that returned list of sessions. That's how the call will look. Now, we need to go into the event service and implement this new method. I'll save and open up event service. 


*/