import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';

class Map extends Component {
  render() {
    const {path, x, y} = this.props;

    const mapStyle = {
      backgroundImage: `url(./${path})`,
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET}px`,
    };

    return <div className="map" style={mapStyle}></div>
  }
}

export default Map;