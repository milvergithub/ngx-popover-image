import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NgxPopoverImageService} from './ngx-popover-image.service';
import {NgxPopoverPosition} from './ngx-popover-position';

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
    protected displayPopover = 'none';
    protected isOpened = false;
    protected isDirective = false;
    protected beforeIsOpened = false;
    @Input() shouldToggle = false;
    positionTop = '100px';
    positionLeft = '100px';
    public insedeContent = false;
    public closePublic = false;

    constructor(private popoverImageService: NgxPopoverImageService) {
    }

    ngOnInit() {
        this.popoverImageService.getPopoverImageSubscription().subscribe(
            (open) => {
                if (open) {
                    this.beforeIsOpened = open;
                } else {
                    this.beforeIsOpened = false;
                    this.hidePopover();
                }
            }
        );
    }

    @HostListener('window:click', ['$event'])
    openPopoverClickEvent($event) {
        if ((!this.isOpened) && (this.insedeContent === false)) {
            let posLeft = this.options.staticValueLeft;
            let posTop = this.options.staticValueTop;
            if (!this.options.staticPositionLeft) {
                posLeft = this.options.afterPositionLeft + $event.clientX + this.options.unit;
            }
            if (!this.options.staticPositionTop) {
                posTop = $event.clientY - this.options.afterPositionTop + this.options.unit;
            }
            this.popoverImageService.setPopoverPosition(new NgxPopoverPosition(posLeft, posTop));
            if (this.beforeIsOpened) {
                this.showPopover();
            }
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

    openPopover(): void {
        this.popoverImageService.sePopoverImageManger(true);
    }

    closePopover(): void {
        this.popoverImageService.sePopoverImageManger(false);
    }

    private showPopover(): void {
        this.positionLeft = this.popoverImageService.getPopoverPosition().positionLeft;
        this.positionTop = this.popoverImageService.getPopoverPosition().positionTop;
        this.shouldToggle = !this.shouldToggle;
        this.displayPopover = 'block';
        this.isOpened = true;
    }

    private hidePopover(): void {
        this.isDirective = false;
        this.positionTop = '-1000px';
        this.positionLeft = '-1000px';
        this.displayPopover = 'none';
        this.shouldToggle = !this.shouldToggle;
        this.isOpened = false;
    }

    public show(position: NgxPopoverPosition): void {
        this.isDirective = true;
        this.popoverImageService.setPopoverPosition(position);
        this.showPopover();
    }

    public hide(): void {
        if (this.closePublic) {
            this.hidePopover();
        }
    }

}
