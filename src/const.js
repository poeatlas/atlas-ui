import atlas from './resources/atlas.json';

function getMapMultiplier() {
  for (const map of atlas) {
    if (map.world_areas_name === "The Shaper's Realm") {
      return (ATLAS_WIDTH / 2) / map.x;
    }
  }
}

export const ATLAS_WIDTH = 2048;
export const ATLAS_HEIGHT = 1152;
export const MAP_MULTIPLIER = getMapMultiplier();
export const MAP_OFFSET = 20/2;