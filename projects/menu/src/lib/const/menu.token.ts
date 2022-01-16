import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const MENU_DATA = new InjectionToken<BehaviorSubject<any>>('MENU_DATA');
