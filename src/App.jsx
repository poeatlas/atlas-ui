import React, { Component } from 'react';
import './App.css';
import atlas from './resources/atlas.json';
import OverlayMap from './components/OverlayMap';
import BonusCount from './components/BonusCount';
import SearchBar from './components/SearchBar';

class App extends Component {

  render() {

    return (
      <div id="atlas">
        <SearchBar />
         { atlas.map((map) => <OverlayMap map={map} key={map.id} /> ) }
        <BonusCount x={atlas[atlas.length-1].x} y={atlas[atlas.length-1].y} />
      </div>
    );
  }
}

export default App;
