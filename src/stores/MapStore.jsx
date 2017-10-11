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

  constructor({id, 
      name, 
      level, 
      x, 
      y, 
      connected, 
      sextant,
      iconPath, 
      shapedIconPath,
      shaperOrbTier}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.connectedMapIds = connected;
    this.worldAreasName = name;
    this.worldAreasLevel = level;
    this.sextantMapIds = sextant;
    this.iconPath = iconPath;
    this.shapedIconPath = shapedIconPath;
    this.shaperOrbTier = shaperOrbTier;
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