import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const TOOLTIP_CONTENT = new InjectionToken<BehaviorSubject<any>>('TOOLTIP_CONTENT');
