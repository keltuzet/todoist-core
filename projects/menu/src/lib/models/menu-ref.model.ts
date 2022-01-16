import { Subject } from 'rxjs';

export class MenuRef {
  public close$ = new Subject<any>();

  close(value?: any): void {
    this.close$.next(value);
  }
}
