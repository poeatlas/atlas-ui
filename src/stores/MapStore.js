import {observable, computed} from 'mobx';

export class MapStore {

    @observable maps = ["Crypt", "Racecourse", "Core", "Shore"];
    @observable filter = "";

    @computed get filteredMaps() {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.maps.filter(map => !this.filter || matchesFilter.test(map));
    }
}
export default new MapStore();