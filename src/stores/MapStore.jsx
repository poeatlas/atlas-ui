import { observable, computed, action } from 'mobx';

class MapStore {
  @observable shaped = false;
  @observable sextanted = false;
  @observable sealed = false;
  @observable highlighted = false;
  @observable shapeHighlighted = false;
  @observable shapedById = -1; // map that this map was shaped by
  @observable shapedMapId = -1; // map that this map shaped
  id = 0;
  x = 0;
  y = 0;
  connectedMapIds = null;
  sextantMapIds = null;
  worldAreasName = null;
  worldAreasLevel = 0;
  iconPath = null;
  shapedIconPath = null;
  shaperOrbTier = 0; // number indicates tier maps this orb can shape

  constructor(raw) {
    this.id = raw.id;
    this.x = raw.x;
    this.y = raw.y;
    this.connectedMapIds = raw.connected;
    this.worldAreasName = raw.name;
    this.worldAreasLevel = raw.level;
    this.sextantMapIds = raw.sextant;
    this.iconPath = raw.iconPath;
    this.shapedIconPath = raw.shapedIconPath;
    this.shaperOrbTier = raw.shaperOrbTier;
  }
  @computed get hasShaperOrb() {
    return this.shaperOrbTier > 0 && !this.usedShaperOrb;
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