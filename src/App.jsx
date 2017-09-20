import React, { Component } from 'react';
import './App.css';
import atlas from './resources/atlas.json';
import Map from './components/Map';
import BonusCount from './components/BonusCount';
import SearchBar from './components/SearchBar';

class App extends Component {

  render() {

    return (
      <div id="atlas">
        <SearchBar />
         { atlas.map((map) => <Map {...map} key={map.id} /> ) }
        <BonusCount x={atlas[atlas.length-1].x} y={atlas[atlas.length-1].y} />
      </div>
    );
  }
}

export default App;
