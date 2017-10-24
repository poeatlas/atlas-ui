import atlas from './resources/atlas.json';

export const ATLAS_WIDTH = 2048;
export const ATLAS_HEIGHT = 1152;
export const MAP_MULTIPLIER = (ATLAS_WIDTH / 2) / atlas[atlas.length - 1].x;
export const SHAPER_ORB_MAP_ARRAY = atlas.filter((map) => { return map.shaperOrbTier; })
  .reduce(function(maps, currMap) { 
      // add shaper orb maps into 2-dim array based on id
      return maps[currMap.shaperOrbTier].push(currMap) && maps;
    },[null, [], [], [], [], [], [], [], [], [], []]);
export const SHAPER_ORB_HIGH_MAP_ARRAY = SHAPER_ORB_MAP_ARRAY
  .filter((map) => { return map && map[0].shaperOrbTier >= 7 })
  .map((arr) => {return arr.sort((a,b) =>  (a.name).localeCompare(b.name)
    // if(a.level > b.level) {
    //   return 1;
    // }
    // if( a.level < b.level ) {
    //   return -1;
    // }
    // return 0; }
  )});