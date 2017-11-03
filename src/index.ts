import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SampleComponent} from './sample.component';
import {SampleDirective} from './sample.directive';
import {SamplePipe} from './sample.pipe';
import {SampleService} from './sample.service';
import {PopoverContent} from './PopoverContent';
import {PopoverDirective} from './popover';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './sample.service';
export * from './PopoverContent';
export * from './popover';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SampleComponent,
        SampleDirective,
        SamplePipe,
        PopoverContent,
        PopoverDirective
    ],
    exports: [
        SampleComponent,
        SampleDirective,
        SamplePipe,
        PopoverContent,
        PopoverDirective
    ]
})
export class PopoverLucyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PopoverLucyModule,
            providers: [SampleService]
        };
    }
}
