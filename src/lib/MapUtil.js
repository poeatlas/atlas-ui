import { MAP_MULTIPLIER, SHAPER_ORB_MAP_ARRAY, SHAPER_ORB_HIGH_MAP_ARRAY } from '../const';

export function getPositionStyle({x,y}) {
  return({
    left: x * MAP_MULTIPLIER,
    top: y * MAP_MULTIPLIER,
  })
}

export function getShapingMap(mapList, map) {
  return mapList[SHAPER_ORB_MAP_ARRAY[map.baseTier][0].id];
}

export function getPrevShapedMap(mapList, shapingMap) {
  return mapList[shapingMap.shapedMapId];
}

export function getShaperOrbHighTierCount(tier) {
  const MIN_TIER = 7;
  return SHAPER_ORB_HIGH_MAP_ARRAY[tier-MIN_TIER].length;
}