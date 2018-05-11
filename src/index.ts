import {CommonModule} from '@angular/common';
import {NgxPopoverDirective} from './ngx-popover.directive';
import {NgxPopoverImageContentComponent} from './ngx-popover-image-content.component';
import {NgModule} from '@angular/core';

export * from './ngx-popover.directive';
export * from './ngx-popover-image-content.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgxPopoverImageContentComponent,
        NgxPopoverDirective,
    ],
    exports: [
        NgxPopoverImageContentComponent,
        NgxPopoverDirective,
    ],
    entryComponents: [
        NgxPopoverImageContentComponent
    ]
})
export class NgxPopoverImageModule {}
