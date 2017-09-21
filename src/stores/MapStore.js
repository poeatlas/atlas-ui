import {
  observable,
  computed
} from 'mobx';

export class MapStore {

  @observable filter = "";

  // @computed get filteredMaps() {
  //   // match filter text--non case sensitive
  //   var matchesFilter = new RegExp(this.filter, "i");
  //   // filtered maps if filter not set or matches our filter text
  //   return this.maps.filter(map => !this.filter || matchesFilter.test(map));
  // }
}
export default new MapStore();
