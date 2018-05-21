import {Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter, Renderer} from '@angular/core';
import {NgxPopoverDirective} from './ngx-popover.directive';
import {Positioning} from './positioning';

@Component({
    selector: 'ngx-popover-content',
    templateUrl: 'popover-content.html',
    styleUrls: ['popover-content.css']
})
export class NgxPopoverImageContentComponent implements AfterViewInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------
    @Input() customClass = '';

    @Input() imageUrl: string;

    @Input() content: string;

    @Input()
    placement: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'auto top' | 'auto bottom' | 'auto left' | 'auto right' = 'bottom';

    @Input()
    title: string;

    @Input()
    animation = true;

    @Input()
    closeOnClickOutside = true;

    @Input()
    closeOnMouseOutside = false;

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------
    @ViewChild('popoverDiv')
    popoverDiv: ElementRef;

    popover: NgxPopoverDirective;
    onCloseFromOutside = new EventEmitter();
    top: any = -10000;
    left: any = -10000;
    isIn = false;
    displayType = 'none';
    effectivePlacement: string;
    unit = 'px';

    // -------------------------------------------------------------------------
    // Anonymous
    // -------------------------------------------------------------------------
    /**
     * Closes dropdown if user clicks outside of this directive.
     */
    onDocumentMouseDown = (event: any) => {
        const element = this.element.nativeElement;
        if (!element || !this.popover) return;
        if (element.contains(event.target) || this.popover.getElement().contains(event.target)) return;
        this.hide();
        this.onCloseFromOutside.emit(undefined);
    }

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(protected element: ElementRef,
                protected cdr: ChangeDetectorRef,
                protected renderer: Renderer) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------
    listenClickFunc: any;
    listenMouseFunc: any;

    ngAfterViewInit(): void {
        if (this.closeOnClickOutside)
            this.listenClickFunc = this.renderer.listenGlobal('document', 'mousedown', (event: any) => this.onDocumentMouseDown(event));
        if (this.closeOnMouseOutside)
            this.listenMouseFunc = this.renderer.listenGlobal('document', 'mouseover', (event: any) => this.onDocumentMouseDown(event));

        this.show();
        this.cdr.detectChanges();
        console.log(this.popoverDiv.nativeElement.getBoundingClientRect());
    }

    ngOnDestroy() {
        if (this.closeOnClickOutside)
            this.listenClickFunc();
        if (this.closeOnMouseOutside)
            this.listenMouseFunc();
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    show(): void {
        if (!this.popover || !this.popover.getElement())
            return;
        const positioning = new Positioning();
        this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement, false);
        const pos = positioning.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement, false);
        this.displayType = 'block';
        this.top = pos.top;
        this.left = pos.left;
        this.isIn = true;
    }

    hide(): void {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    }

    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
    }

    getStyles(): any {
        return {
            'top': this.top + 'px',
            'left': this.left + 'px',
        };
    }

    getStylesImage(): any {
        const rect = this.popoverDiv.nativeElement.getBoundingClientRect();
        let heigthImage = '200px';
        if (rect.height < 200) {
            heigthImage = rect.height + 'px';
        }
        if (this.imagePosition() === 'ngx-popover-image-right') {
            return {
                'width': heigthImage,
                'height': heigthImage,
                'right': '-' + heigthImage
            };
        }
        return {
            'width': heigthImage,
            'height': heigthImage,
            'left': '-' + heigthImage
        };
    }

    imagePosition(): string {
        if (this.getPlacementPosition(this.placement) === 'right') {
            return 'ngx-popover-image-right';
        }
        return 'ngx-popover-image-left';
    }

    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody = false): void {
        let positionStrParts = positionStr.split('-');
        let pos0 = positionStrParts[0];

        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
    }

    protected position(nativeEl: HTMLElement): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = {top: 0, left: 0};
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
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

    protected getStyle(nativeEl: HTMLElement, cssProp: string): string {
        if ((nativeEl as any).currentStyle) // IE
            return (nativeEl as any).currentStyle[cssProp];

        if (window.getComputedStyle)
            return (window.getComputedStyle as any)(nativeEl)[cssProp];

        // finally try and get inline style
        return (nativeEl.style as any)[cssProp];
    }

    protected isStaticPositioned(nativeEl: HTMLElement): boolean {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }

    protected parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    protected getEffectivePlacement(placement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
        const placementParts = placement.split(' ');
        if (placementParts[0] !== 'auto') {
            return placement;
        }

        const hostElBoundingRect = hostElement.getBoundingClientRect();

        const desiredPlacement = placementParts[1] || 'bottom';

        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }

        return desiredPlacement;
    }

    protected getPlacementPosition(placement: string): string {
        const placementParts = placement.split(' ');
        if (placementParts.length === 1) {
            return placementParts[0];
        }
        return placementParts[1];
    }
}
