// 8.3 (11) and we'll have to import that too
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession, restrictedWords } from '../shared/index'

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',

})
export class CreateSessionComponent implements OnInit {
  // 8.3 (10) Okay so we're going to use this output property to emit a message back to our parent component when the user clicks save. So this save new session output property is going to be an event emitter...
  @Output() saveNewSession = new EventEmitter()
  // 8.3 (24) Okay awesome now there's just one more output property that we need. We need to honor this cancel button. So essentially when we click cancel in our create session child component we need to let our event details component know so that it can exit out of add mode. So over in our create session component we will add another output parameter, and we will call that cancel add session, and that will also be event emitter, and then we'll wire up the cancel button click on this component to emit that event.
  @Output() cancelAddSession = new EventEmitter()
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
    // 8.3 (12) Okay so now when we save our session instead of just console logging it we will use our save new session event emitter to emit an event, and the data that we will emit is the session itself. Okay so now we have an output parameter to bind to.
    this.saveNewSession.emit(session)
  }

  // 8.3 (26) and then back in our component we'll handle that, and we will just call emit on our cancel add session emitter.
  cancel() {
    this.cancelAddSession.emit()
  }
}