import { MAP_MULTIPLIER } from '../const';

export function getPositionStyle({x,y}) {
  return({
    left: x * MAP_MULTIPLIER,
    top: y * MAP_MULTIPLIER,
  })
}

// checks highlight for a map based on existing search value
export function refreshSearch(mapStore, atlasStore) {
  const filter = atlasStore.searchString.toLowerCase();

  let filterTier = null;
  const tierIndex = filter.indexOf("tier:");
  if(tierIndex !== -1) {
    filterTier = parseInt(filter.substring(tierIndex+5), 10);
  }

  for (let i = 0; i < atlasStore.mapList.length; i++) {
    const currMap = atlasStore.mapList[i];
    const areaName = currMap.name.toLowerCase();
    const tier = currMap.tier;

    currMap.highlighted = (filter && filter.length <= areaName.length && areaName.indexOf(filter) !== -1)
        || filterTier === tier;
  }
}

// selects shaped or unshaped map image based on shaped state for map component
export function imageSelect(mapStore) {
  
  if (mapStore.sealed) {
    return{};
  }

  return {backgroundImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`};
}

export function imageSelectBase(mapStore) {

  if (mapStore.sealed) {
    return{};
  }
  return {backgroundImage: `url(${process.env.PUBLIC_URL}/Art/2DItems/Maps/Atlas2Maps/New/Base.png)`};
}

export function imageSelectRing(mapStore) {
  if (mapStore.shaped || mapStore.eldered) {
    return {WebkitMaskImage: `url(${process.env.PUBLIC_URL}/Art/2DItems/Maps/Atlas2Maps/New/Ring.png)`,
            };
  }
  return {};
}

export function imageSelectIcon(mapStore) {
  // if (mapStore.shaped) {
  //   return {backgroundImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`,
  //           background: mapStore.baseTier <= 7 ? `yellow` : `red`,
  //           zIndex: 5,};
  // }
  // return {backgroundImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`};

  if (mapStore.shaped || mapStore.eldered) {
    return {WebkitMaskImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`,
            // backgroundColor: `red`,
            // webkitMaskSize: `20px 20px`,
            };
  }
  return {WebkitMaskImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`,
          };
}