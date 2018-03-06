import { observable, action, computed } from 'mobx';

export class AtlasStore {

  @observable filter = "";
  @observable sealState = 0;
  @observable sextantState = 0;
  @observable shaperOrbState = 0;
  @observable elderOrbState = 0;
  @observable activeMap = null;
  @observable searchString = "";

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

  @action setToggle({seal, sextant, shaperOrb, elderOrb}) {
    this.sealState = seal;
    this.sextantState = sextant;
    this.shaperOrbState = shaperOrb;
    this.elderOrbState = elderOrb;
  }

  @action setSeal(value) {
    this.setToggle({
      seal: value,
      sextant: 0,
      shaperOrb: 0,
      elderOrb: 0,});
  }

  @action setSextant(value) {
    this.setToggle({
      seal: 0,
      sextant: value,
      shaperOrb: 0,
      elderOrb: 0,});
  }

  @action setShaperOrb(value) {
    this.setToggle({
      seal: 0,
      sextant: 0,
      shaperOrb: value,
      elderOrb: 0,});
  }

  @action setElderOrb(value) {
    this.setToggle({
      seal: 0,
      sextant: 0,
      shaperOrb: 0,
      elderOrb: value,});
  }

  @computed get bonusCount() {
    let count = 0;
    this.mapList.forEach((map) => {
      if (!map.sealed) {count++;}
    });
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
      activeMap.eldered = false;
    }
  }

  @action toggleSextantState() {
    if (!this.activeMap.sealed) {
      this.activeMap.sextanted = !this.activeMap.sextanted;
    }
  }

  @action toggleShapeState() {
    if (!this.activeMap.sealed) {
      this.activeMap.eldered = false;
      this.activeMap.shaped = !this.activeMap.shaped;
    }
  }

  @action toggleElderState() {
    if (!this.activeMap.sealed) {
      this.activeMap.shaped = false;
      this.activeMap.eldered = !this.activeMap.eldered;
    }
  }
  // @action assign(mapId, assignMapId) {
  //   const map1 = this.mapList[mapId];
  //   let map1ShaperMap = null;
  //   let map2 = null;
  //   const map2ShaperMap = this.mapList[assignMapId];
  //
  //   if (map1.shapedById === assignMapId) { // assigning map with same shaper map = unsassign
  //     map1.shapedById = -1;
  //     this.mapList[assignMapId].shapedMapId = -1;
  //     return;
  //   }
  //
  //   if (map1.shapedById !== -1) { // it already has an assigned map, so either reassign or unassign
  //     map1ShaperMap = this.mapList[map1.shapedById];
  //   }
  //
  //   if (map2ShaperMap.shapedMapId !== -1) { // the map2ShaperMap has already been assigned to a different map
  //     map2 = this.mapList[map2ShaperMap.shapedMapId];
  //   }
  //
  //   // assign map1's shaper orb the the desired shaper orb map + the shaper orb map to point to map1
  //   map1.shapedById = map2ShaperMap.id;
  //   map2ShaperMap.shapedMapId = map1.id;
  //
  //   if (map2) { // unassign the map2's map first (it is taken)
  //     map2.shapedById = -1;
  //   }
  //
  //   if (map1ShaperMap) { // map1 originally had a shaper orb map assigned to it, so unlink it
  //     map1ShaperMap.shapedMapId = -1;
  //
  //     // since we took map2's original shaper orb map, give it map1's shaper orb map
  //     if (map2) {
  //       map2.shapedById = map1ShaperMap.id;
  //       map1ShaperMap.shapedMapId = map2.id;
  //     }
  //   }
  // }

  @action resetMaps() {
    this.mapList.forEach((map) => map.reset());
    this.filter = "";
    this.sealState = 0;
    this.sextantState = 0;
    this.shaperOrbState = 0;
    this.elderOrbState = 0;
    this.activeMap = null;
  }

}
export default AtlasStore;
