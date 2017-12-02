import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NgxPopoverImageService {

  private popoverImageManager = new BehaviorSubject<boolean>(false);

  public getPopoverImageSubscription(): Observable<any> {
    return this.popoverImageManager.asObservable();
  }
  public sePopoverImageManger(open: boolean): void {
    this.popoverImageManager.next(open);
  }
}
