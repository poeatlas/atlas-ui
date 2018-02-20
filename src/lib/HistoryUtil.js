import { SHAPER_ORB_HIGH_MAP_ARRAY } from '../const';
import { getShapingMap } from './MapUtil';

const SEAL_MASK = 1;
const SEXTANT_MASK = 2;
const SHAPE_MASK = 4;
const ASSIGN_ONE_MASK = 8;
const ASSIGN_TWO_MASK = 16;
const ASSIGN_THREE_MASK = 32;
const MIN_TIER = 7;

class HistoryUtil {
  atlasStore = null;
  history = null;

  constructor(atlasStore, history) {
    this.atlasStore = atlasStore;
    this.history = history;
  }

  decodeHistory() {
    // current history symbols string
    const searchString = this.history.location.search;
    const searchSubstring = searchString.substring(1,searchString.length);
    const searchSymbolArr = searchSubstring.split("");

    // all history symbol represntations
    const SYMBOLS = "-0123456789abcdefghijklmnopqrstuvwxyzAB";
    const symbolArr = SYMBOLS.split("");

    searchSymbolArr.forEach((symbol, i) => {
      const historyIndex = symbolArr.indexOf(symbol);
      const map = this.atlasStore.mapList[i];

      // check if no values set
      if (historyIndex === 0 && map.shapedMapId === -1 && map.shapedById === -1) {
        map.reset();
        return;
      }
      map.sealed = (historyIndex & SEAL_MASK) !== 0;
      map.sextanted = (historyIndex & SEXTANT_MASK) !== 0;
      map.shaped = (historyIndex & SHAPE_MASK) !== 0;
      // console.log((historyIndex & SEAL_MASK) !== 0, (historyIndex & SEXTANT_MASK) !== 0, (historyIndex & SHAPE_MASK) !== 0);
      
      console.log(this.atlasStore.activeMap);
      if(map.shaped) {
        this.atlasStore.activeMap = map;
        if (map.baseTier <= 7) {
          console.log("in low tier check");
          const shapingMap = getShapingMap(this.atlasStore.mapList, map);
          // console.log(shapingMap);
          map.shapedById = shapingMap.id;
          shapingMap.shapedMapId = map.id;  
        }
        else if (map.baseTier > 7 && map.baseTier <= 10) {
          const assignMapSubArr = SHAPER_ORB_HIGH_MAP_ARRAY[map.baseTier-MIN_TIER];
          let assignMap = null;
          // check if there is a map assigned
          if ((historyIndex & ASSIGN_ONE_MASK)) {
            assignMap = this.atlasStore.mapList[assignMapSubArr[0].id];
          } else if ((historyIndex & ASSIGN_TWO_MASK)) {
            assignMap = this.atlasStore.mapList[assignMapSubArr[1].id];
          } else if ((historyIndex & ASSIGN_THREE_MASK)) {
            assignMap = this.atlasStore.mapList[assignMapSubArr[2].id];
          }
          // set map's shapedbyid and assignmap's shapedmapid
          if (assignMap) {
            console.log(assignMap);
            this.atlasStore.shapedMapList.push(map);
            this.atlasStore.recordHighShapedMaps();
            this.atlasStore.assign(map.id,assignMap.id);
          }
          // console.log(this.atlasStore.shapedMapList);
          
        }
      }
    })
  }
  // call on every change--loops throguh all maps and checks relevant states
  // records state changes based on index totals vs symbol array
  recalculateHistory() {
    let historyStr = "";
    const SYMBOLS = "-0123456789abcdefghijklmnopqrstuvwxyzAB";
    const symbolArr = SYMBOLS.split("");
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
      // console.log(historyIndex, symbolArr[historyIndex]);
      historyStr = historyStr + symbolArr[historyIndex];
    })
    this.history.replace(process.env.PUBLIC_URL + "/?" + historyStr);
  }
}

export default HistoryUtil;