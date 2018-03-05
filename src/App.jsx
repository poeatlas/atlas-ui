import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import './App.css';
import atlas from './resources/atlas.json';
import Map from './components/Map';
import BonusCount from './components/BonusCount';
import SearchBar from './components/SearchBar';
import HistoryUtil from './lib/HistoryUtil';

class App extends Component {
  componentWillMount() {
    const historyUtil = new HistoryUtil(this.props.atlasStore, this.props.history);
    historyUtil.decodeHistory();
  }

  render() {
    const lastMap = atlas[atlas.length-1];

    return (
        <div id="atlas">
          <SearchBar mapList={this.props.mapStore}/>
           { atlas.map((map) =>
            <Map map={map}
              key={map.id}
              mapStore={this.props.mapStore[map.id]}
              mapList = {this.props.mapStore}
            /> ) }
          <BonusCount x={lastMap.x} y={lastMap.y} />
        </div>
    );
  }
}

export default withRouter(App);
