import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("MapStore")
@observer
class Map extends Component {

  filterChange() {
    // var matchFilter = new RegExp(this.props.MapStore.filter, "i");
    const filterStr = this.props.MapStore.filter.toLowerCase();
    const areaNameStr = this.props.map.worldAreasName.toLowerCase();
    if (areaNameStr.toLowerCase().indexOf(filterStr) !== -1) {
      return { opacity: '1' };
    } else {
      return { opacity: '0.5' };
    }
  }

  render() {
    const {iconPath, x, y, worldAreasName, worldAreasLevel, id, shaperOrb} = this.props.map;
    const TIER_MAGIC_LEVEL = 67;
    const SHAPERS_REALM_ID = 125;
    const mapClass = {
      map: true,
      shaperId: id===SHAPERS_REALM_ID ? true : false
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
          <div className={cx(mapClass)} style={{ ...mapStyle, ...this.filterChange()}}></div>  
        </OverlayTrigger>
        {/*blue circle indicating map can be shaped*/}
        { shapableMap }
      </div>
    );
  }
}

export default Map;