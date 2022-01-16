import { ConnectedPosition } from '@angular/cdk/overlay';

export interface MenuPositions {
  above: ConnectedPosition;
  below: ConnectedPosition;
  before: ConnectedPosition;
  after: ConnectedPosition;
}

export type MenuPosition = keyof MenuPositions;
