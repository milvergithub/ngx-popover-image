/**
 * This is only for local test
 */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ViewChild} from '@angular/core';
import {Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {PopoverLucyModule} from 'ngx-popover-image';

@Component({
    selector: 'app',
    template: `
        <div class="container container-fluid">
            <br><br><br><br><br>
            <button (click)="evento()" class="btn btn-sm btn-success">open click</button>
            <button [ngxPopoverImage]="popoverImage" class="btn btn-sm btn-success">open hover</button>
        </div>
        <app-ngx-popover-image #popoverImage
                               [image]="image"
                               [modal]="true">
            <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
            <span style="color: #C21F39">A aliquam autem</span>
            <span style="color: #00b3ee">beatae commodi</span>
            labore magnam magni mollitia natus rem saepe?
            <b><i><span style="color: #ffc520">Popover With</span></i></b>
            <small>Consequuntur cum deleniti deserunt earum error nesciunt quae vel vitae.</small>
            .
            Click outside of this popover and it will be dismissed automatically.
            <button class="btn btn-primary" (click)="popoverImage.closePopover()">close</button>
        </app-ngx-popover-image>
    `
})
class AppComponent {

    @ViewChild('popoverImage') popoverImage: NgxPopoverImageComponent;
    image = 'http://reneemullingslewis.com/wp-content/uploads/2014/08/woman-smiling.png';
    constructor() {
    }

    evento() {
        this.popoverImage.openPopover();
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, PopoverLucyModule]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
