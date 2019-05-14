import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'


@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height: 100px; }
  `]
})

export class EventDetailsComponent {
    event:any

    constructor(private eventService:EventService, private route:ActivatedRoute) {
  
    }
    ngOnInit() {
        // this.event = this.eventService.getEvent(1)
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']) // we're casting to a number with the + in front of 'this' 
    }
}
/*
6.11 
Lazily Loading Feature Modules
So far, our application has only one Angular module. It's our main app module. Let's take a look at adding multiple modules and some of the performance benefits that we get from that. Typically, larger sites can be broken down into smaller sections. Imagine we had a section of our site for creating and managing user profiles. Let's go ahead and create the shell of an edit profile page that will be part of a new module. So we'll create a new user folder. And inside that folder we'll create a profile component. Okay, let's just grab the basic starting point for this component from our GitHub helper repo. So over here we have a app folder, and in our app folder we have a user folder, and then we have this profile component. So let's just grab the raw contents of that, copy it, and paste it into here. Okay, so now we have this user profile component that we'll update later for adding a profile. Right now it just has two buttons and an empty spot where we'll put a form later. So the pattern that we've seen so far is that, at this point, we would go and add this to the module and to the routes. And we still want to do that, but the user portion of our site is very different from the rest of our site. So we'd like to make this a totally separate module and feature section of our site. So let's go create a new user module. In the user folder we'll create a module. Alright, and a basic lazy loadable module will look like this. Okay, so we'll declare our module like we normally do. Okay, and it will have imports, declarations, and providers. Alright, this looks similar to our app module, except for our imports are going to be a little bit different. Here we're going to use CommonModule, and in our app component, we actually import BrowserModule here. So that's one key difference between the app module and a feature module, or a lazy loadable module. And then the other difference is, for our router module, we'll call forChild. In our app module, we used forRoot here. And then we'll just pass in the routes for this module. Okay, we haven't created those. Let's go ahead and create import, and then we'll go create them. Okay, so we've already created a profile component that we want to import into our new user module. Okay, so let's declare that down here. Alright, now let's go ahead and go create our routes. So we'll create a new routes file, and it will look like this. Okay, so there's nothing different with this route. However, I do want to make note of one thing. It looks from this like route for this would be /profile. But when we're done with everything, the route is actually going to be /user/profile. And you'll see why in a second here. But just keep that in mind. So this new feature module is ready to go. Now we need to go tell our main app module when this module should be lazily loaded. We actually define that in the main module's routing config. So let's open that up. And then right here, we're going to create a new route, and its path is going to be user. So this is where that prefix to our user feature routes is going to come from. So anything inside the user feature module is going to have a route that's prefixed with user. And then to load that module and its routes, we use loadChildren. And then you supply a string here that's parsed by Angular that has two parts. The first part is the path to the file where your new module is. So that's here. And then the second part follows a hash sign. And the second part here is the name of the module. So if we go over to our user module, you can see what's being exported here is the class userModule, and actually, that should be an uppercase. And then that's what we'll put as the second part of this string. Okay, so this is basically saying, when a route starts with /user, load the user module from this path. Alright, now let's go add a link to our new profile page. So over in our nav bar HTML, right here, we're displaying Welcome John up in the upper right hand corner. And let's add a router link to this anchor tag. And that will link to our new user profile page. Okay, so this is all wired up. Let's go take a look. So I'll refresh here. Okay, so now notice, if I click on Welcome John here, that it loads our new user profile. And notice the URL up here is /user/profile. And one thing that's really cool here. Let's open up our debug tools to the network tab. And I'm going to refresh my app here. And first let's put a filter in here, /user. So let's see what requests are made for /user when I first load this app. Alright, notice nothing is loaded here. But when I click on the user profile and go to the user profile page, notice that only then did it load the user module and the routes and the component. In a bigger application, this could be really helpful if a module is composed of a lot of files. It would avoid loading those until the user actually goes to that section of the site. Okay, cool. So that's how you add new feature modules to your application and lazily load them.

*/