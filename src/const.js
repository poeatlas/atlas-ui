import atlas from './resources/atlas.json';

function getShaperMaps() {
  const maps = [];
  for (var i = 0; i < atlas.length; i++) {
    const shaperOrbTier = atlas[i].shaperOrbTier;
    if (atlas[i].shaperOrbTier) {
      if (!maps[shaperOrbTier]) {
        maps[shaperOrbTier] = [];
      }

      maps[shaperOrbTier].push(atlas[i].id);
    }
  }
  return maps;
}

export const ATLAS_WIDTH = 2048;
export const ATLAS_HEIGHT = 1152;
export const MAP_MULTIPLIER = (ATLAS_WIDTH / 2) / atlas[atlas.length - 1].x;
export const SHAPER_ORB_MAP_ARRAY = getShaperMaps();