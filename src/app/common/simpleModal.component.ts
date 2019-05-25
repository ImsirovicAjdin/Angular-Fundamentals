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
    @Input() closeOnBodyClick: string;
    @ViewChild('modalcontainer') containerEl: ElementRef; 

    constructor(@Inject(JQ_TOKEN) private $: any) {}

    closeModal() {
        console.log('closemodal');
        if(this.closeOnBodyClick.toLocaleLowerCase() === "true") {
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    }
}
/*
12.10 Creating Settings on Components
Now the feature that we've added to our modal, where the dialog box is closed if somebody clicks anywhere in the body of that dialog box might be a feature that you don't want in all cases. There might be times where you have a modal dialog box that you don't want it to close when somebody clicks in the body. Maybe it's not displaying a list of links anymore. Maybe it's just displaying some information. And you want to be able to click a button or something like that, and not the dialog box close. So let's make this a setting. And what we want it to look like inside of our Nav HTML, where we define the modal, it'd be nice if we could just say, closeOnBodyClick="true", and now it's going to close the dialog box if we click on the body, but if we don't include this attribute or set it to anything else, then the dialog box won't get closed when we click on the body. So let's save that, and we'll go into our simple-modal, and we're going to add another input property, and that'll be closeOnBodyClick, the attribute that we just created, and that's a string, and then now all we have to do is go down into our close modal method, and say, if(this. closeOnBodyClick, and let's lowercase that to make it easy, and we'll compare it to the string "true, " and if it's true, then we will close it, and if it's false, we won't. So let's go back and change this to false, and go to the browser and refresh, and we open up the modal dialog. If we click in the body, it's not going to close it, even though it still does navigate, but if we set this to true, and try it again, then it does close the dialog box when we click the body.
*/