import { ConnectedPosition } from '@angular/cdk/overlay';
import { MenuPosition, MenuPositions } from '../models';

export const MENU_POSITIONS: MenuPositions = Object.freeze({
  above: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  below: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  before: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  after: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
});

export const MENU_VERTICAL_POSITIONS_KEY: [MenuPosition, MenuPosition] = ['above', 'below'];
export const MENU_HORIZONTAL_POSITIONS_KEY: [MenuPosition, MenuPosition] = ['after', 'before'];

export function isVertical(position: MenuPosition): boolean {
  return MENU_VERTICAL_POSITIONS_KEY.includes(position);
}

export function getBasePosition(position: MenuPosition): ConnectedPosition {
  return {
    ...MENU_POSITIONS[position],
    weight: 4,
  };
}

export function getOpposite(position: MenuPosition): ConnectedPosition {
  let opposite: MenuPosition;
  if (isVertical(position)) {
    opposite = position === 'above' ? 'below' : 'above';
  } else {
    opposite = position === 'after' ? 'before' : 'after';
  }

  return {
    ...MENU_POSITIONS[opposite],
    weight: 3,
  };
}

export function getOppositeSides(position: MenuPosition): ConnectedPosition[] {
  let weight = 2;
  return (isVertical(position) ? MENU_HORIZONTAL_POSITIONS_KEY : MENU_VERTICAL_POSITIONS_KEY).map((key) => ({
    ...MENU_POSITIONS[key],
    weight: weight--,
  }));
}

export function getPositions(position: MenuPosition): ConnectedPosition[] {
  return [getBasePosition(position), getOpposite(position), ...getOppositeSides(position)];
}
