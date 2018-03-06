const SEAL_MASK = 1;
const SEXTANT_MASK = 2;
const SHAPE_MASK = 4;
const ELDER_MASK = 8;

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
      if (historyIndex === 0 && map.shapedById === -1) {
        map.reset();
        return;
      }
      map.sealed = (historyIndex & SEAL_MASK) !== 0;
      map.sextanted = (historyIndex & SEXTANT_MASK) !== 0;
      map.shaped = (historyIndex & SHAPE_MASK) !== 0;
      map.eldered = (historyIndex & ELDER_MASK) !== 0;
    })
  }
  // call on every change--loops throguh all maps and checks relevant states
  // records state changes based on index totals vs symbol array
  recalculateHistory() {
    let historyStr = "";
    const SYMBOLS = "-0123456789abcdefghijklmnopqrstuvwxyzAB";
    const symbolArr = SYMBOLS.split("");

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
      if (map.eldered) {
        historyIndex = historyIndex + 8;
      }
      historyStr = historyStr + symbolArr[historyIndex];
    });
    this.history.replace(process.env.PUBLIC_URL + "/?" + historyStr);
  }
}

export default HistoryUtil;