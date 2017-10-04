import { observable, computed, action } from 'mobx';


class MapStore {
  @observable shaped = false;
  @observable sextanted = false;
  @observable sealed = false;
  @observable highlighted = false;
  @observable shapeHighlighted = false;
  @observable isHidden = false;
  @observable usedShaperOrb = false;
  @observable shabedById = -1;
  id = 0;
  x = 0;
  y = 0;
  connectedMapIds = null;
  worldAreasName = null;
  worldAreasLevel = 0;
  iconPath = null;
  shapedIconPath = null;
  shaperOrb = 0; // number indicates tier maps this orb can shape

  constructor({id, 
      x, 
      y, 
      connectedMapIds, 
      worldAreasName, 
      worldAreasLevel, 
      iconPath, 
      shapedIconPath,
      shaperOrb}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.connectedMapIds = connectedMapIds;
    this.worldAreasName = worldAreasName;
    this.worldAreasLevel = worldAreasLevel;
    this.iconPath = iconPath;
    this.shapedIconPath = shapedIconPath;
    this.shaperOrb = shaperOrb;
  }
  @computed get hasShaperOrb() {
    return this.shaperOrb && !this.usedShaperOrb;
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

  @computed get name() {
    return this.shaped ? "Shaped " + this.worldAreasName : this.worldAreasName;  
  }
}

export default MapStore;