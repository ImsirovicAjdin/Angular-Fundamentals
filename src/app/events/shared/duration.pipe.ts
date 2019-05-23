import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        switch(value) {
            case 1: return 'Half Hour'
            case 2: return 'One Hour'
            case 3: return 'Half Day'
            case 4: return 'Full Day'
            default: return value.toString();
        }
    }
}

/*
10.3 Creating a Custom Pipe
Another formatting problem that we've got inside of our application is the duration. Currently it's just showing a number, and we actually want this to show what the actual duration of the session is. If we look at the Add Session page, we can see that duration is selected and has one of four options. Half hour, 1 Hour, Half Day, Full Day, corresponding to one, two, three, or four. So let's fix that. Let's display our durations as their string value, not as their numeric value. Unfortunately a duration pipe is not built in to Angular 2. Of course it's not, because this is very business specific. So we're going to have to create one. Go back into our code, and underneath the shared folder under events, we're going to create a new file called duration. pipe. ts. And we're going to import from angular/core, Pipe, and PipeTransform. And now we can use the type decorator and that just requires one piece of information, which is the name of the pipe, and this pipe's name is going to be duration, and now we'll export a class. We'll call it DurationPipe, and that implements PipeTransform. And we're getting an error because it's not implementing the correct piece, which is a transform function. It has to implement a transform function. And this transform function takes in one parameter of value. In our case we know this is a number, so we're going to type this as number, and it returns a string. And now string is underlined because we're not returning a string yet, so let's create a switch on the value, and in the case that this is a one, we're going to return the string Half Hour, and we need three more cases. And finally, we need a default, so we're going to write, in that case return value. toString. And now our pipe's been created, but we can't just go into our session-list. component and enter duration, add the duration pipe. If we do we'll get an error, and the error pops us and it says, "The pipe 'duration' could not be found. " We have to make Angular 2 aware of this duration pipe, so we're going to go into our index barrel file, and we're going to export, star, from the new file we created, duration. pipe. And then inside of our app module, we're going to import this duration pipe. It's from this events index, so I can just add that here, and then we need to add it to the declarations section, so I want to go past these components and add it last. If we go back and refresh our page, we no longer get an error, and our duration is now displaying as its string value. So that is how we create a custom pipe. It's very simple. All you have to do is run a transform function that takes in the input value and returns the output value. There's a homework assignment for this concept, so if you want to do that, go ahead and do that now.

*/