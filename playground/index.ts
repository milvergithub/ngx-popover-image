/**
 * This is only for local test
 */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ViewChild} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {PopoverLucyModule} from 'ngx-popover-image';

@Component({
    selector: 'app',
    templateUrl: 'home/home.component.html',
    styleUrls: ['home/home.component.css']
})
class AppComponent {

    @ViewChild('popoverImage') popoverImage: NgxPopoverImageComponent;
    image = 'http://reneemullingslewis.com/wp-content/uploads/2014/08/woman-smiling.png';
    defaultOptions = <NgxPopoverImageOptions> {
        unit: 'px',
        afterPositionLeft: 200,
        afterPositionTop: 100,
        staticPositionLeft: true,
        staticValueLeft: '40%',
    };
    constructor() {
    }

    openPopoverImage() {
        this.popoverImage.openPopover();
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, PopoverLucyModule]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
