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

  // set shaped state for maps tier 7 and lower
  // shaper orb source tracking will be removed in future versions (after 3.0)
export function executeLowShapeModal(mapStore, mapList, atlasStore, ModalStore) {

  const shapingMap = getShapingMap(mapList,mapStore);
  const prevShapedMap = getPrevShapedMap(mapList,shapingMap);
  
  if (shapingMap.usedShaperOrb && prevShapedMap.id !== mapStore.id) {
    const modalValues = {
      title: "Shaping Orb Tier Limit Reached",
      shown: true,
      body: "Only one map can be shaped for this tier. Do you want to unshape the " + prevShapedMap.worldAreasName + " Map?",
      callback: () => {
        atlasStore.switchShaping();
        ModalStore.shown = false;
      },
    }
    ModalStore.setModalValues(modalValues)
    return true;
  }
  return false;
}

// set shaped states for maps tier 8 and higher
// shaper orb source tracking will be removed in future versions (after 3.0)
export function executeHighShapeModal(mapStore, mapList, atlasStore, ModalStore) {

  const mapBaseTier = mapStore.baseTier;
  const shapedMapTierCount = atlasStore.shapedMapTierCount(mapBaseTier);
  const shaperOrbHighTierCount = getShaperOrbHighTierCount(mapBaseTier);
  // show modal if orb limit for map tier reached 
  if (!mapStore.shaped && shapedMapTierCount >= shaperOrbHighTierCount) {
    const modalValues = {
      title: "Shaping Orb Tier Limit Reached",
      shown: true,
      body: "Maximum number of maps that can be shaped for Tier " + mapBaseTier + " is " + shapedMapTierCount + ". Please unshape a map first.",
      extraButton: false,
      callback: () => {
        ModalStore.shown = false;
      },
    }
    ModalStore.setModalValues(modalValues);
    return true;
  }
  return false;
}

// selects shaped or unshaped map image based on shaped state for map component
export function imageSelect(mapStore) {
  
  if (mapStore.sealed) {
    return{};
  }
  if (mapStore.shaped) {
    return {backgroundImage: `url(${process.env.PUBLIC_URL}/${mapStore.shapedIconPath})`};
  } else {
    return {backgroundImage: `url(${process.env.PUBLIC_URL}/${mapStore.iconPath})`};
  }
}