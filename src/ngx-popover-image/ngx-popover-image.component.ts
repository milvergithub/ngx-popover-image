import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NgxPopoverImageService} from './ngx-popover-image.service';
import {NgxPopoverPosition} from './ngx-popover-position';

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
    @Input() image: string;
    @Input() closeOnMouseOutside = true;
    protected displayPopover = 'none';
    protected isOpened = false;
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
      this.popoverImageService.setPopoverPosition(new NgxPopoverPosition(200 + $event.clientX + 'px', $event.clientY - 100 + 'px'));
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
    this.positionTop = '-1000px';
    this.positionLeft = '-1000px';
    this.displayPopover = 'none';
    this.shouldToggle = !this.shouldToggle;
    this.isOpened = false;
  }

    public show(position: NgxPopoverPosition): void {
        this.popoverImageService.setPopoverPosition(position);
        this.showPopover();
    }

    public hide(): void {
        if (this.closePublic) {
            this.hidePopover();
        }
    }

}
