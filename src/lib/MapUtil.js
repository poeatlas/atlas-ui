import { MAP_MULTIPLIER } from '../const';

export function getPositionStyle({x,y}) {
  return({
    left: x * MAP_MULTIPLIER,
    top: y * MAP_MULTIPLIER,
  })
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
  if (mapStore.shaped) {
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

  if (mapStore.shaped) {
    return {WebkitMaskImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`,
            // backgroundColor: `red`,
            // webkitMaskSize: `20px 20px`,
            };
  }
  return {WebkitMaskImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`,
          };
}