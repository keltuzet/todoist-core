import { ConnectedPosition } from '@angular/cdk/overlay';

export interface TooltipPositions {
  above: ConnectedPosition;
  below: ConnectedPosition;
  left: ConnectedPosition;
  right: ConnectedPosition;
}

export type TooltipPosition = keyof TooltipPositions;
