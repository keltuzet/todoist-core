import { Directive, HostListener } from '@angular/core';
import { MenuRef } from '../models';

@Directive({
  selector: '[tMenuClose]',
})
export class MenuCloseDirective {
  constructor(private menuRef: MenuRef) {}

  @HostListener('click') close(): void {
    this.menuRef.close();
  }
}
