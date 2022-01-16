import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuRef } from '../models';

@Component({
  selector: 't-menu',
  template: `<ng-container #container></ng-container>`,
  styles: [],
  providers: [MenuRef],
  viewProviders: [MenuRef],
})
export class MenuComponent {
  @ViewChild('container', { static: true, read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private ref: MenuRef) {}
}
