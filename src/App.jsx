import React, { Component } from 'react';
import './App.css';
import atlas from './resources/atlas.json';
import Map from './components/Map';
import BonusCount from './components/BonusCount';
import SearchBar from './components/SearchBar';

class App extends Component {

  render() {
    const lastMap = atlas[atlas.length-1];
    console.log(this.props);
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

export default App;
