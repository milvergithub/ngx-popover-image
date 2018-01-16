import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgxPopoverImageService} from './ngx-popover-image.service';
import {NgxPopoverPosition} from './ngx-popover-position';
import {NgxPopoverImageDirective} from './ngx-popover-image';

export interface NgxPopoverImageOptions {
    unit: string;
    afterPositionLeft: number;
    afterPositionTop: number;
    staticPositionLeft: boolean;
    staticPositionTop: boolean;
    staticValueLeft: string;
    staticValueTop: string;
}

export let defaultOptions = <NgxPopoverImageOptions> {
    unit: 'px',
    afterPositionLeft: 200,
    afterPositionTop: 100,
    staticPositionLeft: false,
    staticPositionTop: false,
    staticValueLeft: '45%',
    staticValueTop: '45%'
};

@Component({
    selector: 'app-ngx-popover-image',
    templateUrl: './ngx-popover-image.component.html',
    styleUrls: ['./ngx-popover-image.component.css'],
    providers: [
        NgxPopoverImageService
    ]
})
export class NgxPopoverImageComponent implements OnInit {

    @Input() modal = false;
    @Input() bubble = true;
    @Input() image: string;
    @Input() closeOnMouseOutside = true;
    @Input() options = defaultOptions;
    @Input() placement: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'auto top' | 'auto bottom' | 'auto left' | 'auto right' = 'bottom';
    protected displayPopover = 'block';
    protected isDirective = false;
    positionTop = '100px';
    positionLeft = '100px';
    public insedeContent = false;
    public popover: NgxPopoverImageDirective;
    @ViewChild('popoverDiv') popoverDiv: ElementRef;
    effectivePlacement: string;

    constructor(protected viewContainerRef: ViewContainerRef,
                private popoverImageService: NgxPopoverImageService) {
    }

    ngOnInit() {
        this.popoverImageService.getPopoverImageSubscription().subscribe(
            (open) => {
                if (open === 'hide') {
                    this.hidePopover();
                }
            }
        );
    }

    @HostListener('window:click', ['$event'])
    openPopoverClickEvent($event) {
        let posLeft = this.options.staticValueLeft;
        let posTop = this.options.staticValueTop;
        if (!this.options.staticPositionLeft) {
            posLeft = this.options.afterPositionLeft + $event.clientX + this.options.unit;
        }
        if (!this.options.staticPositionTop) {
            posTop = $event.clientY - this.options.afterPositionTop + this.options.unit;
        }
        this.popoverImageService.setPopoverPosition(new NgxPopoverPosition(posLeft, posTop));
        if (this.popoverImageService.getPopoverImageStatus() === 'pending') {
            this.showPopover();
        }
    }

    @HostListener('mouseover')
    onMouseOver() {
        this.insedeContent = true;
    }

    @HostListener('mouseout')
    onMouseOut() {
        this.insedeContent = false;
    }

    isOpenedPopover(): boolean {
        return this.popoverImageService.getPopoverImageStatus() === 'show';
    }

    openPopover(): void {
        this.popoverImageService.sePopoverImageManger('pending');
    }

    closePopover(): void {
        this.popoverImageService.sePopoverImageManger('hide');
    }

    private showPopover(): void {
        this.popoverImageService.sePopoverImageManger('show');
        this.positionLeft = this.popoverImageService.getPopoverPosition().positionLeft;
        this.positionTop = this.popoverImageService.getPopoverPosition().positionTop;
        this.displayPopover = 'block';
    }

    private hidePopover(): void {
        this.isDirective = false;
        this.positionTop = '-1000px';
        this.positionLeft = '-1000px';
        this.displayPopover = 'block';
    }

    public show(): void {
        this.isDirective = true;
        const pos = this.positionElements(
            this.popover.getElement(),
            this.popoverDiv.nativeElement,
            this.placement);
        const position = new NgxPopoverPosition(pos.left + 'px', pos.top + 'px');
        this.popoverImageService.setPopoverPosition(position);
        this.showPopover();
    }

    public hide(): void {
        this.popoverImageService.sePopoverImageManger('hide');
    }

    protected positionElements(hostEl: HTMLElement,
                               targetEl: HTMLElement,
                               positionStr: string,
                               appendToBody = false): { top: number, left: number } {
        let positionStrParts = positionStr.split('-');
        let pos0 = positionStrParts[0]; // right
        let pos1 = positionStrParts[1] || 'center'; // center
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        let shiftWidth: any = {
            center: function (): number {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function (): number {
                return hostElPos.left;
            },
            right: function (): number {
                return hostElPos.left + hostElPos.width;
            }
        };

        let shiftHeight: any = {
            center: function (): number {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function (): number {
                return hostElPos.top;
            },
            bottom: function (): number {
                return hostElPos.top + hostElPos.height;
            }
        };
        let targetElPos: { top: number, left: number };
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;

            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;

            case 'bottom':
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;

            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }

        return targetElPos;
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
            top: elBCR.top ,
            left: elBCR.left + elBCR.left - offsetParentBCR.left
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

    protected parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    protected getStyle(nativeEl: HTMLElement, cssProp: string): string {
        if ((nativeEl as any).currentStyle) {
            /**IE*/
            return (nativeEl as any).currentStyle[cssProp];
        }

        if (window.getComputedStyle) {
            return (window.getComputedStyle as any)(nativeEl)[cssProp];
        }
        return (nativeEl.style as any)[cssProp];
    }

    protected isStaticPositioned(nativeEl: HTMLElement): boolean {
        return (this.getStyle(nativeEl, 'position') || 'static' ) === 'static';
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
}
