import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]: any } {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['coutnry'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((addressControl && addressControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
            return null;
        } else {
            return {validateLocation: false}
        }
    }
}

/*
13.07 Adding a Validator to Angular's Validators
And we've created our directive, it's a valid directive, and our module knows about it, so it can be used as a directive. In order for that to happen, we've got to add this validator to angular's list of validators. And that list exists here in angular forms as ng underscore validators. This is an opaque token, if we were to inspect this variable it would be an opaque token. What it represents, of course, is a list of every validator that angular supports. If we want to add a new validator to our application, we need to add it to this service, essentially, this ng validator service, and there's a very special way that we do that using some syntax that we haven't seen before. Now if you remember, and this is how it works. We're going to go down into our directive and we're going to add a providers key. Now if you remember in a previous section, we talked about dependency injection and how every component has its own dependency injector. We can register services with the dependency injector on a given component, and those services will be available to that component and its children. That works for directives just like it works for components. So this allows us to use this providers key here just like we do in the app dot module file. But what we're going to do is we're not going to create a new service. Instead we're going to add this validator, the location validator, to this list of ng validators which is essentially a service. And we do that by giving an array to providers. And we use the same syntax that we saw before when we were adding new providers using the long form of provide and then we give it a token, so here we use our ng validators token, and we're going to say use existing, and that will be our location validator. So again, I'm giving it the same class that I'm creating right here. Now you might look at this and say wait a second. What you're actually doing is overwriting the ng validators with the location validators, so whatever was there is going to be gone, and instead all we have is the location validators, so all the built-in validators would not work anymore. That would be true if I left it exactly like this. Instead I'm going to add a third key to this object called multi and set it to true. When I do this, what it does is that it tells angular hey, this service here, which is a validator, we want to add it to this list of services because we're setting multi to true. This ultimately is a collection of services, and we're adding one more item to that list. I know this sounds a little bit weird, and it's not really important that you understand this from a level that you'll want to do this on your own, because this would be a very unusual case, but for adding your own custom validators, you need to know the syntax so that you can do it yourself. And rather than just showing the syntax, we're going to explain it a little bit, that what this does is that it adds another item to this list of services that's underneath the ng validators. Once we've done that, we've now registered our validator with angular so that it's available as a validator in a form. And again, even though this is a little bit deep, all you need to know is that this is a list of validators and we're adding a new one to it by setting multi to true.

*/