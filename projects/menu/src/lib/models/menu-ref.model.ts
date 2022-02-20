import { Observable, Subject } from 'rxjs';

export class MenuRef<T = any> {
  private close$ = new Subject<any>();
  public onClose: Observable<T> = this.close$.asObservable();
  public backdropCloseValue!: T;

  close(value?: T): void {
    this.close$.next(value);
  }
}
