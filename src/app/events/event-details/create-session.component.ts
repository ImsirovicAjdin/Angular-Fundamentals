// 8.3 (9) Okay, and we'll have to import output.
import { Component, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession, restrictedWords } from '../shared/index'

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',

})
export class CreateSessionComponent implements OnInit {
// 8.3 (8) kay let's go check that out. So let's refresh and go to event details. Okay so you can see here's our header and we have this add session link here. So if I click on that then we get our create session form, and this is where our output parameters come in. Our sessions need to be added to the current event that we are looking at in the events details page. So when we click save here this session that we add needs to be added to this event, and then this event needs to be saved with its new sessions, and so when we click save on this create session form we just want to pass that session data back to the event details phonic and let it handle all of that. So over in our create session component we just need to create an output parameter for our parent component to bind to. So right here we'll add our output property. 
  @Output() saveNewSession
  newSessionForm: FormGroup
  name: FormControl
  presenter: FormControl
  duration: FormControl
  level: FormControl
  abstract: FormControl

  ngOnInit() {
    this.name = new FormControl('', Validators.required)
    this.presenter = new FormControl('', Validators.required)
    this.duration = new FormControl('', Validators.required)
    this.level = new FormControl('', Validators.required)
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    })
  }

  saveSession(formValues) {
    let session:ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    }
    console.log(session)
  }
}