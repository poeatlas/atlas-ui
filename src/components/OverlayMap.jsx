import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import Map from './Map';
import MapHighlight from './MapHighlight';
import cx from 'classnames';

class OverlayMap extends Component {
  render() {
    const {iconPath, x, y, worldAreasName, worldAreasLevel, id, shaperOrb} = this.props.map;
    const TIER_MAGIC_LEVEL = 67;
    const MAP_TIER = worldAreasLevel - TIER_MAGIC_LEVEL;
    const SHAPERS_REALM_ID = 125;
    const isShaperId = id===SHAPERS_REALM_ID ? true : false
    
    const areaNameStr = this.props.map.worldAreasName.toLowerCase();
    var shapableMap;

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={worldAreasName + " Map"}>
        <strong>Tier: </strong> { MAP_TIER } <br />
        <strong>Area Level: </strong> { worldAreasLevel } <br />
      </Popover>
    );
    
    // map image position for div
    const mapPositionStyle = {
      position: "aboslute",
      backgroundImage: `url(./${iconPath})`,
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET}px`,
    };

    // shaper orb position -- offset by 2.5
    const shaperOrbStyle = {
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET * 2.5}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET * 2.5}px`,
    };
    
    // highlight component position
    const highlightStyle = {
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET * 1.5}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET * 1.5}px`,
    }

    // determine mapClass -- if it is the shaper's realm, do not resize
    const mapClass = {
      map: true,
      shaperId: isShaperId
    }
    // props for filter highlight component
    const mapProps = {
      highlightStyle,
      areaNameStr,
      MAP_TIER,
    };

    if(shaperOrb) {
      shapableMap = <div className="shaperOrb" style={shaperOrbStyle}></div>;
    }
    return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
          <div className={cx(mapClass)} style={mapPositionStyle}>
          </div>
        </OverlayTrigger>
        {/*blue circle indicating map can be shaped*/}
        { shapableMap }
        {/*component activates highlight div based on filter var*/}
        <MapHighlight mapProps={mapProps}></MapHighlight>
      </div>
    );
  }
}
export default OverlayMap;