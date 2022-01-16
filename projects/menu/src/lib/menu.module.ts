import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuComponent } from './components';
import { MenuCloseDirective, MenuTriggerDirective } from './directives';

@NgModule({
  declarations: [MenuComponent, MenuTriggerDirective, MenuCloseDirective],
  imports: [CommonModule, OverlayModule],
  exports: [MenuTriggerDirective, MenuCloseDirective],
})
export class MenuModule {}
