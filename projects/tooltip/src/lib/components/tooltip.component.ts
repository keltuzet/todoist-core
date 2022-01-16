import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TOOLTIP_CONTENT } from '../const';

@Component({
  selector: 't-tooltip',
  template: `<div>{{ content | async }}</div>`,
  host: { class: 'tooltip' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  constructor(@Inject(TOOLTIP_CONTENT) public content: BehaviorSubject<any>) {}
}
