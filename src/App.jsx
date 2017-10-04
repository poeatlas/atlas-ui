import React, { Component } from 'react';
import './App.css';
import atlas from './resources/atlas.json';
import Map from './components/Map';
import BonusCount from './components/BonusCount';
import SearchBar from './components/SearchBar';

class App extends Component {

  render() {
    console.log(this.props);
    return (
      <div id="atlas">
        <SearchBar mapStore={this.props.mapStore}/>
         { atlas.map((map) => 
          <Map map={map} 
            key={map.id} 
            mapStore={this.props.mapStore[map.id]} 
            mapList = {this.props.mapStore} 
          /> ) }
        <BonusCount x={atlas[atlas.length-1].x} y={atlas[atlas.length-1].y} />
      </div>
    );
  }
}

export default App;
