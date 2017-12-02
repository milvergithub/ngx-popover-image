import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverContent} from './PopoverContent';
import {PopoverDirective} from './popover';
import {NgxPopoverImageComponent} from './ngx-popover-image/ngx-popover-image.component';
import {NgxPopoverImageService} from './ngx-popover-image/ngx-popover-image.service';

export * from './PopoverContent';
export * from './popover';
export * from './ngx-popover-image/ngx-popover-image.component'
export * from './ngx-popover-image/ngx-popover-image.service'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverContent,
        PopoverDirective,
        NgxPopoverImageComponent
    ],
    exports: [
        PopoverContent,
        PopoverDirective,
        NgxPopoverImageComponent
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
