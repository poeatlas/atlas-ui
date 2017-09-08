import React, { Component } from 'react';
import './App.css';
import atlas from './resources/atlas.json';
import Map from './components/Map';

class App extends Component {

  render() {
    return (
      <div id="atlas">
         { atlas.map((map) => <Map x={map.x} y={map.y} path={map.icon_path} name={map.world_areas_name} key={map.id} /> ) }
      </div>
    );
  }
}

export default App;
