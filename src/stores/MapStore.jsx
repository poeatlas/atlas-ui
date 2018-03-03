import { observable, computed, action } from 'mobx';

class MapStore {
  @observable shaped = false;
  @observable sextanted = false;
  @observable sealed = false;
  @observable highlighted = false;
  @observable shapeHighlighted = false;
  @observable blockState = false; // false if not showing sextant block, true if showing sextant block
  @observable shapedById = -1; // map that this map was shaped by
  @observable shapedMapId = -1; // map that this map shaped
  @observable layerSource = [[],[],[]];
  id = 0;
  x = 0;
  y = 0;
  connectedMapIds = null;
  sextantMapIds = null;
  worldAreasName = null;
  worldAreasLevel = 0;
  iconPath = null;
  visited = null; // visited nodes for sextant blocking
  unique = false;

  constructor(raw) {
    this.id = raw.id;
    this.x = raw.x;
    this.y = raw.y;
    this.connectedMapIds = raw.connected;
    this.worldAreasName = raw.name;
    this.worldAreasLevel = raw.level;
    this.sextantMapIds = raw.sextant;
    this.iconPath = raw.iconPath;
    this.unique = raw.unique;
  }

  @action reset() {
    this.shaped = false;
    this.sextanted = false;
    this.sealed = false;
    this.shapedById = -1;
    this.shapedMapId = -1;
    this.blockState = false;
    this.layerSource = [[],[],[]];
  }
  @computed get blockMask() {
    let mask = 0;
    if (this.layerSource[0] &&  this.layerSource[0].length) {
      mask = 1;
    }
    if (this.layerSource[1] &&  this.layerSource[1].length) {
      mask = 2;
    }
    if (this.layerSource[2] && this.layerSource[2].length) {
      mask = 4;
    }
    // mask = this.layerSource[0] && this.layerSource[0].length ? 1 : 0;
    // mask += this.layerSource[1] &&  this.layerSource[1].length ? 2 : 0;
    // mask += this.layerSource[2] && this.layerSource[2].length ? 4 : 0;
    return mask;
  }

  @computed get isMapShown() {
    return !this.sealed;
  }

  @computed get mapLevel() {
    return this.shaped ? this.worldAreasLevel + 5 : this.worldAreasLevel;
  }

  @computed get tier() {
    return this.mapLevel - 67;
  }

  @computed get baseTier() {
    return this.worldAreasLevel - 67;
  }

  @computed get name() {
    return this.shaped ? "Shaped " + this.worldAreasName : this.worldAreasName;  
  }

  @computed get usedShaperOrb() {
    return this.shapedMapId !== -1;
  }
}

export default MapStore;