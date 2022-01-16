import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './components';
import { TooltipDirective } from './directives';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent],
  imports: [CommonModule, OverlayModule],
  exports: [TooltipDirective],
})
export class TooltipModule {}
