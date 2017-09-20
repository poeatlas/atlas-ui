import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { observer } from 'mobx-react';
import cx from 'classnames';

// @inject("mapStore")
@observer
class Map extends Component {

  render() {
    const {iconPath, x, y, worldAreasName, worldAreasLevel, id, shaperOrb} = this.props;
    const TIER_MAGIC_LEVEL = 67;
    const mapClass = {
      map: true,
      shaperId: id===125 ? true : false
    }
    var shapableMap;

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={worldAreasName + " Map"}>
        <strong>Tier: </strong> { worldAreasLevel - TIER_MAGIC_LEVEL } <br />
        <strong>Area Level: </strong> { worldAreasLevel } <br />
      </Popover>
    );

    const mapStyle = {
      backgroundImage: `url(./${iconPath})`,
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET}px`,
    };

    const shaperOrbStyle = {
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET * 2.5}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET * 2.5}px`,
    };
    
    if(shaperOrb) {
      shapableMap = <div className="shaperOrb" style={shaperOrbStyle}></div>;
    }
  return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
          <div className={cx(mapClass)} style={mapStyle}></div>  
        </OverlayTrigger>
        { shapableMap }
      </div>
    );
  }
}

export default Map;