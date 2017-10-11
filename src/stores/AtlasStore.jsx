import { observable, action } from 'mobx';

export class AtlasStore {

  @observable filter = "";
  @observable sealState = 0;
  @observable sextantState = 0;
  @observable shaperOrbState = 0;
  @observable downgradeState = 0;

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

  // @computed get filteredMaps() {
  //   // match filter text--non case sensitive
  //   var matchesFilter = new RegExp(this.filter, "i");
  //   // filtered maps if filter not set or matches our filter text
  //   return this.maps.filter(map => !this.filter || matchesFilter.test(map));
  // }
}
export default new AtlasStore();
