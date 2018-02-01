import { observable, action, computed } from 'mobx';

import { getShapingMap, getPrevShapedMap } from '../lib/MapUtil';

export class AtlasStore {

  @observable filter = "";
  @observable sealState = 0;
  @observable sextantState = 0;
  @observable shaperOrbState = 0;
  @observable activeMap = null;
  @observable shapedMapList = [];

  //SHAPED_MAP_LIST = [];
  mapList = [];

  constructor(mapList) {
    this.mapList = mapList;
    //this.SHAPED_MAP_LIST = mapList.filter((map) => { return map.shaperOrbTier; })
    //  .reduce(function(maps, currMap) { 
    //    // add shaper orb maps into 2-dim array based on id
    //    return maps[currMap.shaperOrbTier].push(currMap) && maps;
    //  },[null, [], [], [], [], [], [], [], [], [], []]);
  }

  @action setToggle({seal, sextant, shaperOrb, downgrade}) {
    this.sealState = seal;
    this.sextantState = sextant;
    this.shaperOrbState = shaperOrb;
    this.downgradeState = downgrade;
  }

  @action setSeal(value) {
    this.setToggle({
      seal: value,
      sextant: 0,
      shaperOrb: 0,
      downgrade: 0,});
  }

  @action setSextant(value) {
    this.setToggle({
      seal: 0,
      sextant: value,
      shaperOrb: 0,
      downgrade: 0,});
  }

  @action setShaperOrb(value) {
    this.setToggle({
      seal: 0,
      sextant: 0,
      shaperOrb: value,
      downgrade: 0,});
  }

  @action setDowngrade(value) {
    this.setToggle({
      seal: 0,
      sextant: 0,
      shaperOrb: 0,
      downgrade: value,});
  }

  @computed get bonusCount() {
    let count = 0;
    this.mapList.forEach((map) => {
      if (!map.sealed) {count++;}
    })
    return count;
  }

  fetchSextantLayers(map) {
    if (map.visited) { 
      return; 
    }

    const mapList = this.mapList.map((map) => { return {map, layer: 0}});
    const queue = [mapList[map.id]];
    const visited = [mapList[map.id]];

    while (queue.length > 0) {
      const node = queue.shift();

      if (!node.map.sextantMapIds || node.layer === 3) {
        continue;
      }
      
      node.map.sextantMapIds.forEach((mapId) => {
        const adjacentMap = mapList[mapId];
        if (!visited.includes(adjacentMap)) {
          queue.push(adjacentMap);
          visited.push(adjacentMap);
          adjacentMap.layer = node.layer + 1;
        }
        
      });
    }

    // remove source Map from own visited array
    visited.shift();
    map.visited = visited;
  }

  @action displaySextantBlock() {
    const activeMap = this.activeMap;
    
    this.fetchSextantLayers(activeMap);
    activeMap.blockState = !activeMap.blockState;

    activeMap.visited.forEach((blockedMap) => {
      const map = blockedMap.map;
      // if blockState true for blocking map, record layers, else empty layerSource arrays
      if (activeMap.blockState) {
        map.layerSource[blockedMap.layer - 1].push(activeMap.id);
      }
    });
  }

  // clears map object's layersource to remove mask from previous sextant block
  @action resetSextantBlock() {
    this.mapList.forEach((map) => {
      map.layerSource = [[],[],[]];
    });
  }

  @action autoSextant() {
    const activeMap = this.activeMap;
    this.fetchSextantLayers(activeMap);
    activeMap.visited.forEach((blockedMap) => blockedMap.map.sextanted = true);
  }

  @action toggleSealState() {
    const activeMap = this.activeMap;
    
    activeMap.sealed = !this.activeMap.sealed;
    
    if (activeMap.sealed) {
      activeMap.sextanted = false;
      activeMap.shaped = false;
      if (activeMap.shapedById !== -1) {
        this.mapList[activeMap.shapedById].shapedMapId = -1;
        activeMap.shapedById = -1;
      }
    }
  }

  @action toggleSextantState() {
    if (!this.activeMap.sealed) {
      this.activeMap.sextanted = !this.activeMap.sextanted;
    }
  }

  @computed get sortedShapedMapList() {
    return this.shapedMapList.sort((a,b) => {
      if (a.baseTier > b.baseTier){
        return 1;
      }
      if (a.baseTier < b.baseTier) {
        return - 1;
      }
      if (a.baseTier - b.baseTier === 0){
        (a.name).localeCompare(b.name);
      } return 0;
    } );
  }

  @action shapedMapTierCount(tier) {
    return this.shapedMapList.filter((map) => {
      return map.baseTier === tier;
    }).length;
  }
  // store shaping map's id and the shaped map's id
  @action setShapeId() {
    const shapingMap = getShapingMap(this.mapList, this.activeMap)

    if( !this.activeMap.shaped ) {
      this.activeMap.shapedById = shapingMap.id; 
      shapingMap.shapedMapId = this.activeMap.id;
    } else {
      shapingMap.shapedMapId = -1; 
    }
  }

  @action toggleLowShapedState() {
    const shapedState = !this.activeMap.shaped;
    this.setShapeId(this.activeMap);
    this.activeMap.shaped = shapedState;
  }
  
  @action recordHighShapedMaps() {
    const shapedMapListIndex = this.shapedMapList.indexOf(this.activeMap);
    // record shaped maps into list
    if (this.activeMap.shaped && shapedMapListIndex === -1) {
      this.shapedMapList.push(this.activeMap)
    } else if (!this.activeMap.shaped && shapedMapListIndex > -1) {
      this.shapedMapList.splice(shapedMapListIndex, 1);
    }
  }

  // toggle shaped state based on tier/shaped id/shaping map id
  @action toggleHighShapedState() {
    const shapedState = !this.activeMap.shaped;
    this.activeMap.shaped = shapedState;
    this.recordHighShapedMaps()
  }
  // switch shaped states between 2 maps (tier <= 6)
  @action switchShaping() {
    const shapingMap = getShapingMap(this.mapList, this.activeMap);
    const prevShapedMap = getPrevShapedMap(this.mapList, shapingMap);

    prevShapedMap.shaped = false;
    prevShapedMap.shapedById = -1;

    this.activeMap.shaped = true;
    this.activeMap.shapedById = shapingMap.id;
    shapingMap.shapedMapId = this.activeMap.id;

    this.activeMap.showUnshapeModal = false;
  }

  @action assign(mapId, assignMapId) {
    const map1 = this.mapList[mapId];
    let map1ShaperMap = null;
    let map2 = null;
    const map2ShaperMap = this.mapList[assignMapId];

    if (map1.shapedById === assignMapId) { // assigning map with same shaper map = unsassign
      map1.shapedById = -1;
      this.mapList[assignMapId].shapedMapId = -1;
      return;
    }

    if (map1.shapedById !== -1) { // it already has an assigned map, so either reassign or unassign
      map1ShaperMap = this.mapList[map1.shapedById];
    }

    if (map2ShaperMap.shapedMapId !== -1) { // the map2ShaperMap has already been assigned to a different map
      map2 = this.mapList[map2ShaperMap.shapedMapId];
    }

    // assign map1's shaper orb the the desired shaper orb map + the shaper orb map to point to map1
    map1.shapedById = map2ShaperMap.id;
    map2ShaperMap.shapedMapId = map1.id;

    if (map2) { // unassign the map2's map first (it is taken)
      map2.shapedById = -1;
    }

    if (map1ShaperMap) { // map1 originally had a shaper orb map assigned to it, so unlink it 
      map1ShaperMap.shapedMapId = -1;

      // since we took map2's original shaper orb map, give it map1's shaper orb map
      if (map2) {
        map2.shapedById = map1ShaperMap.id;
        map1ShaperMap.shapedMapId = map2.id;
      }
    }
  }

  @action resetMaps() {
    this.mapList.forEach((map) => map.reset());
    this.filter = "";
    this.sealState = 0;
    this.sextantState = 0;
    this.shaperOrbState = 0;
    this.activeMap = null;
    this.shapedMapList = [];
  }

}
export default AtlasStore;
