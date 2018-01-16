import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {NgxPopoverPosition} from './ngx-popover-position';

@Injectable()
export class NgxPopoverImageService {

    private popoverImageStatus = new BehaviorSubject<string>('hide');

    private popoverPosition = new BehaviorSubject<NgxPopoverPosition>(new NgxPopoverPosition('-1000', '-1000'));

    public getPopoverImageSubscription(): Observable<any> {
        return this.popoverImageStatus.asObservable();
    }

    public sePopoverImageManger(open: string): void {
        this.popoverImageStatus.next(open);
    }

    public getPopoverImageStatus(): string {
        return this.popoverImageStatus.getValue();
    }

    public getPopoverPosition(): NgxPopoverPosition {
        return this.popoverPosition.getValue();
    }

    public setPopoverPosition(position: NgxPopoverPosition): void {
        this.popoverPosition.next(position);
    }
}
