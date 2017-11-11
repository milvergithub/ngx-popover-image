import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopoverContent} from './PopoverContent';
import {PopoverDirective} from './popover';

export * from './PopoverContent';
export * from './popover';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverContent,
        PopoverDirective
    ],
    exports: [
        PopoverContent,
        PopoverDirective
    ]
})
export class PopoverLucyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PopoverLucyModule
        };
    }
}
