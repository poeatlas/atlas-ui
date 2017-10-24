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
  // toggle shaped state based on tier/shaped id/shaping map id
  @action toggleShapedState() {
    if (this.shaperOrbState && this.activeMap.shapedIconPath) {
      const shapedState = !this.activeMap.shaped;
      // low tier
      if( this.activeMap.baseTier <= 6) {
        getShapingMap(this.mapList, this.activeMap).usedShaperOrb = shapedState;
        this.setShapeId(this.activeMap);
        this.activeMap.shaped = shapedState;
      // high tier
      } else if (this.activeMap.baseTier > 6 && this.activeMap.baseTier <= 10) {
        this.activeMap.shaped = shapedState;
        const shapedMapListIndex = this.shapedMapList.indexOf(this.activeMap)

        if (this.activeMap.shaped && shapedMapListIndex === -1) {
          this.shapedMapList.push(this.activeMap)
        } else if (!this.activeMap.shaped && shapedMapListIndex > -1) {
          this.shapedMapList.splice(shapedMapListIndex, 1);
        }
      }
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
