import { MAP_MULTIPLIER } from '../const';

  export function getPositionStyle({x,y}) {
    return({
      left: x * MAP_MULTIPLIER,
      top: y * MAP_MULTIPLIER,
    })
  }
