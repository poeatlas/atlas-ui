import { SHAPER_ORB_HIGH_MAP_ARRAY } from '../const';

class HistoryUtil {
  atlasStore = null;
  history = null;

  constructor(atlasStore, history) {
    this.atlasStore = atlasStore;
    this.history = history;
  }

  // encode64(str) {
  //   return new Buffer(lzw.encode(str)).toString('base64');
  // }

  // decode64(str) {
  //   return new Buffer(lzw.decode(str), 'base64').toString('utf8')
  // }

  // call on every change--loops throguh all maps and checks relevant states
  // records state changes based on index totals vs symbol array
  recalculateHistory() {
    let historyStr = "";
    const symbols = "-0123456789abcdefghijklmnopqrstuvwxyzAB";
    const symbolArr = symbols.split("");
    const MIN_TIER = 7;
    const ASSIGN_VALUES = [8,16,32];

    this.atlasStore.mapList.forEach((map) =>
      {
        let historyIndex = 0;
        if (map.sealed) {
          historyIndex++;
        }
        if (map.sextanted) {
          historyIndex = historyIndex + 2;
        }
        if (map.shaped) {
          historyIndex = historyIndex + 4;
        }
        if (map.shapedById !== -1 && map.baseTier > 7) {
          // get position of assigned shaping map in menu
          // must map to id array first as array contains list of objects
          const assignPosition = SHAPER_ORB_HIGH_MAP_ARRAY[map.baseTier-MIN_TIER]
            .map((map) => {return map.id}).indexOf(map.shapedById);
          historyIndex = historyIndex + ASSIGN_VALUES[assignPosition];  
        }
        console.log(historyIndex, symbolArr[historyIndex]);
        historyStr = historyStr + symbolArr[historyIndex];
      }
    )
    this.history.push("?" + historyStr);
  }
}

export default HistoryUtil;