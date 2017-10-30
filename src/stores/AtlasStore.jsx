import { observable, action, computed } from 'mobx';

import { getShapingMap, getPrevShapedMap } from '../lib/MapUtil';

export class AtlasStore {

  @observable filter = "";
  @observable sealState = 0;
  @observable sextantState = 0;
  @observable shaperOrbState = 0;
  @observable downgradeState = 0;
  @observable activeMap = null;
  @observable shapedMapList= [];
  mapList = [];

  constructor(mapList) {
    this.mapList = mapList;
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

  @action toggleSealState() {
    this.activeMap.sealed = !this.activeMap.sealed;
  }

  @action toggleSextantState() {
    this.activeMap.sextanted = !this.activeMap.sextanted;
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

    // store shaping map's id and the shaped map's id
  @action setCustomShapeId(map, shapingMapId) {
    const shapingMap = this.mapList[shapingMapId];
    if( map.shaped ) {
      
      if (shapingMap.shapedMapId !== -1) {
        const prevShapedMap = this.mapList[shapingMap.shapedMapId];
        prevShapedMap.shapedById = shapingMapId;
      }
      map.shapedById = shapingMap.id; 
      shapingMap.shapedMapId = map.id;
      shapingMap.usedShaperOrb = true;
    } else {
      map.shapedById = -1;
      shapingMap.shapedMapId = -1;
      shapingMap.usedShaperOrb = false;
    }
  }

  @action toggleLowShapedState() {
    const shapedState = !this.activeMap.shaped;
    getShapingMap(this.mapList, this.activeMap).usedShaperOrb = shapedState;
    this.setShapeId(this.activeMap);
    this.activeMap.shaped = shapedState;
  }
  
  // toggle shaped state based on tier/shaped id/shaping map id
  @action toggleHighShapedState() {
    const shapedState = !this.activeMap.shaped;
    this.activeMap.shaped = shapedState;
    const shapedMapListIndex = this.shapedMapList.indexOf(this.activeMap)
    // record shaped maps into list
    if (this.activeMap.shaped && shapedMapListIndex === -1) {
      this.shapedMapList.push(this.activeMap)
    } else if (!this.activeMap.shaped && shapedMapListIndex > -1) {
      this.shapedMapList.splice(shapedMapListIndex, 1);
    }
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
}
export default AtlasStore;
