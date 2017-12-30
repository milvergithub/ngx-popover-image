import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPopoverImageComponent} from './ngx-popover-image/ngx-popover-image.component';
import {NgxPopoverImageService} from './ngx-popover-image/ngx-popover-image.service';
import {NgxPopoverImageDirective} from './ngx-popover-image/ngx-popover-image';

export * from './ngx-popover-image/ngx-popover-image.component'
export * from './ngx-popover-image/ngx-popover-image.service'
export * from './ngx-popover-image/ngx-popover-image'
export * from './ngx-popover-image/ngx-popover-position'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgxPopoverImageComponent,
        NgxPopoverImageDirective
    ],
    exports: [
        NgxPopoverImageComponent,
        NgxPopoverImageDirective,
    ]
})
export class PopoverLucyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PopoverLucyModule,
            providers: [NgxPopoverImageService]
        };
    }
}
