import {ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, ViewContainerRef} from '@angular/core';
import {NgxPopoverImageComponent} from './ngx-popover-image.component';
import {NgxPopoverPosition} from './ngx-popover-position';
import {NgxPopoverImageService} from './ngx-popover-image.service';

@Directive({
    selector: '[ngxPopoverImage]',
    exportAs: 'ngxPopoverImage',
    providers: [NgxPopoverImageService]
})
export class NgxPopoverImageDirective {

    protected popover: ComponentRef<NgxPopoverImageComponent>;
    protected visible: boolean;
    @Input() triggerEvent = 'click';
    @Input('ngxPopoverImage') content: NgxPopoverImageComponent;

    constructor(protected viewContainerRef: ViewContainerRef,
                protected popoverImageService: NgxPopoverImageService,
                protected resolver: ComponentFactoryResolver) {
    }

    @HostListener('click')
    showOrHideOnClick(): void {
        if (this.triggerEvent === 'hover') {return; }
        this.displayPopoverDirective();
    }

    @HostListener('mouseover')
    showOnHover(): void {
        if (this.triggerEvent === 'click') {return; }
        this.displayPopoverDirective();
    }

    private displayPopoverDirective() {
        const pos = this.positionElements(this.getElement());
        this.content.show(new NgxPopoverPosition(pos.left + pos.width - 1 + 'px', pos.top - 100 + 'px'));
    }

    @HostListener('mouseout')
    hideOnHover(): void {
        const vm = this;
        this.content.closePublic = true;
        setTimeout(function () {
            vm.content.hide();
        }, 600);
    }

    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }

    protected positionElements(hostEl: HTMLElement): { top: number, left: number, width: number, height: number } {
        return this.offset(hostEl);
    }

    protected offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }
}
