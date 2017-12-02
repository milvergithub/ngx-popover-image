import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgxPopoverImageService} from './ngx-popover-image.service';

@Component({
  selector: 'app-ngx-popover-image',
  templateUrl: './ngx-popover-image.component.html',
  styleUrls: ['./ngx-popover-image.component.css'],
  providers: [
    NgxPopoverImageService
  ],
  animations: [
    trigger('popoverImageAnimation', [
      state('true', style({
        transform: 'scale(0.8)',
      })),
      state('false', style({
        transform: 'scale(1.0)',
      })),
      transition('* => *', animate('200ms'))
    ])
  ]
})
export class NgxPopoverImageComponent implements OnInit, OnDestroy {

  @Input() modal = false;
  @Input() image: string;
  protected displayPopover = 'none';
  protected isOpened = false;
  protected beforeIsOpened = false;
  @Input() shouldToggle = false;
  positionTop = '100px';
  positionLeft = '100px';
  protected insedeContent = false;

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
      this.positionLeft = 200 + $event.clientX + 'px';
      this.positionTop = $event.clientY - 100 + 'px';
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

    ngOnDestroy(): void {
    }
}
