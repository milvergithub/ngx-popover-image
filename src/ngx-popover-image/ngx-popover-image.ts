import {ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, ViewContainerRef} from '@angular/core';
import {NgxPopoverImageComponent} from './ngx-popover-image.component';
import {NgxPopoverImageService} from './ngx-popover-image.service';

@Directive({
    selector: '[ngxPopoverImage]',
    exportAs: 'ngxPopoverImage',
    providers: [NgxPopoverImageService]
})
export class NgxPopoverImageDirective {

    protected popover: ComponentRef<NgxPopoverImageComponent>;
    @Input() closeMouseOut = true;
    @Input() triggerEvent = 'click';
    @Input('ngxPopoverImage') content: NgxPopoverImageComponent;

    constructor(protected viewContainerRef: ViewContainerRef,
                protected popoverImageService: NgxPopoverImageService,
                protected resolver: ComponentFactoryResolver) {
    }

    @HostListener('click')
    showOrHideOnClick(): void {
        if (this.triggerEvent === 'hover') {
            return;
        }
        this.displayPopoverDirective();
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    showOnHover(): void {
        if (this.triggerEvent === 'click') {
            return;
        }
        this.displayPopoverDirective();
    }

    private displayPopoverDirective() {
        this.content.popover = this;
        this.content.show();
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hideOnHover(): void {
        if (!this.closeMouseOut) {
            return;
        }
        this.content.hide();
    }

    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
