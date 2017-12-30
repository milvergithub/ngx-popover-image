import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {NgxPopoverPosition} from './ngx-popover-position';

@Injectable()
export class NgxPopoverImageService {

    private popoverImageManager = new BehaviorSubject<boolean>(false);

    private popoverClose = new BehaviorSubject<boolean>(false);

    private popoverPosition = new BehaviorSubject<NgxPopoverPosition>(new NgxPopoverPosition('-1000', '-1000'));

    public getPopoverImageSubscription(): Observable<any> {
        return this.popoverImageManager.asObservable();
    }

    public sePopoverImageManger(open: boolean): void {
        this.popoverImageManager.next(open);
    }

    public getPopoverCloseSubscription(): Observable<any> {
        return this.popoverClose.asObservable();
    }

    public setPopoverClose(close: boolean): void {
        this.popoverClose.next(close);
    }

    public getPopoverPosition(): NgxPopoverPosition {
        return this.popoverPosition.getValue();
    }

    public setPopoverPosition(position: NgxPopoverPosition): void {
        this.popoverPosition.next(position);
    }
}
