import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AtlasImage from './Art/2DArt/Atlas/Atlas.png';
import MapsJSON from './atlasmaps.json';

var atlasMap = {
  backgroundImage: `url(${AtlasImage})`,
  width: "2048px",
  height: "1152px",
} 
class App extends Component {
  drawMap(map) {
    var path = './' + map.icon_path;
    var xMult = (2048/2) / 499.667;

    var mapStyle = {
      backgroundImage: 'url(' + require(`${path}`) + ')',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      width: 19 + 'px',
      height: 19 + 'px',
      padding: 9 + 'px',
      left: `${map.x * xMult - 20/2}px`,
      top: `${map.y * xMult - 20/2}px`,
      backgroundSize: `19px 19px`,
    };
    console.log(path)
    return <div style={mapStyle}></div>
    // return <img src={require(`${path}`)} style={mapStyle} />
  }
  
  drawMaps(maps) {
    return maps.map(this.drawMap);
  }
  render() {
    return (
      <div style={ atlasMap }>
        { this.drawMaps(MapsJSON) }
      </div>
    );
  }
}

export default App;
