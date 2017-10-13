import { observable, computed, action } from 'mobx';


class MapStore {
  @observable shaped = false;
  @observable sextanted = false;
  @observable sealed = false;
  @observable highlighted = false;
  @observable shapeHighlighted = false;
  @observable isHidden = false;
  @observable usedShaperOrb = false;
  @observable shapedById = -1;
  @observable shapedMapId = -1;
  @observable showUnshapeModal = false;
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

  @action toggleShaperOrbMap(value) {
    this.isHidden = !value;
    this.shapehighlighted = value;
  }

  @computed get isMapShown() {
    return !this.isHidden && !this.sealed;
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
}

export default MapStore;