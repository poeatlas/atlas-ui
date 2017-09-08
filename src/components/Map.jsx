import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class Map extends Component {

  render() {
    const {path, x, y, name} = this.props;

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={name + " Map"}>
        <strong>Tier: </strong> { name }
      </Popover>
    );

    const mapStyle = {
      backgroundImage: `url(./${path})`,
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET}px`,
    };

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
        <div className="map" style={mapStyle}></div>
      </OverlayTrigger>
    );
  }
}

export default Map;