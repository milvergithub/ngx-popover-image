/**
 * This is only for local test
 */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgxPopoverImageModule} from 'ngx-popover-image';

@Component({
    selector: 'app',
    templateUrl: 'home/home.component.html',
    styleUrls: ['home/home.component.css']
})
class AppComponent {

    public imageUrl = 'image.svg';
    constructor() {
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, NgxPopoverImageModule]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
