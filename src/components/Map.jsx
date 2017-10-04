import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import MapHighlight from './MapHighlight';
import ShapedHighlight from './ShapedHighlight';
import ShaperOrbCircle from './ShaperOrbCircle';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject("AtlasStore") @observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.executeAtlasAction = this.executeAtlasAction.bind(this);
  }
  // click event on map div--set states for sextanted, sealed, shaped
  executeAtlasAction() {
    const atlasStore = this.props.AtlasStore;
    const { mapStore, mapList } = this.props;
    
    if (atlasStore.sealState) {
      mapStore.sealed = !mapStore.sealed;
    } 
    // toggle sextant state
    else if (atlasStore.sextantState) {
      mapStore.sextanted = !mapStore.sextanted;
    } 
    // toggle shape state if map is shapable
    else if (atlasStore.shaperOrbState && mapStore.hasShaperOrb) {
      mapStore.usedShaperOrb = true;
      atlasStore.shaperOrbUsedId = mapStore.id;
      
      // toggle hidden/highlight state of maps depending on what tier map shaper orb is clicked
      for ( var i = 0; i < mapList.length ; i++ ) {
        const currMap = mapList[i];
        // show shappable maps--must be of shaper orb tier and be shapable
        if(currMap.tier === mapStore.shaperOrb && currMap.shapedIconPath) {
          currMap.isHidden = false;
          currMap.shapeHighlighted = true;
        } else if (currMap.tier !== mapStore.shaperOrb) {
          currMap.isHidden = true;
          currMap.shapeHighlighted = false;
        }
      }
    } else if (atlasStore.shaperOrbState && !mapStore.hasShaperOrb) {
      mapStore.shaped = !mapStore.shaped;
      mapStore.shapedById = atlasStore.shaperOrbUsedId;
      atlasStore.shaperOrbUsedId = -1;
      
      //after shaping a map, hide unshaped options, and show maps with shaper orbs again
      for (var j = 0; j < mapList.length; j++ ) {
        console.log(mapStore.shapedById);
        const currMap = mapList[j];
        // map has shaper orb--show + highlight
        if(currMap.hasShaperOrb) {
          currMap.shapeHighlighted = true;
          currMap.isHidden = false;
        
        } else if (!currMap.shaped){
          currMap.shapeHighlighted = false;
          // currMap.isHidden = true;
        }
      }
    }
  }

  render() {
    const {iconPath, shapedIconPath, x, y, worldAreasLevel, id} = this.props.map;
    const { mapStore } = this.props;
    const TIER_MAGIC_LEVEL = 67;
    const MAP_TIER = worldAreasLevel - TIER_MAGIC_LEVEL;
    const SHAPERS_REALM_ID = 125;
    const isShaperId = id===SHAPERS_REALM_ID ? true : false

    const areaNameStr = mapStore.name.toLowerCase();

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={mapStore.name + " Map"}>
        <strong>Tier: </strong> { mapStore.tier } <br />
        <strong>Area Level: </strong> { mapStore.mapLevel } <br />
      </Popover>
    );
    
    // shaped map image position for div
    const shapedMapImageStyle = {
      backgroundImage: `url(./${shapedIconPath})`,
      position: "aboslute",
      left: `${x * MAP_MULTIPLIER - MAP_OFFSET}px`,
      top: `${y * MAP_MULTIPLIER - MAP_OFFSET}px`,
    };
    // shaped map image position for div
    const mapImageStyle = {
      backgroundImage: `url(./${iconPath})`,
      position: "aboslute",
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

    const sextantStyle = {
      left: `${x * MAP_MULTIPLIER}px`,
      top: `${y * MAP_MULTIPLIER}px`,
    }
    // determine mapClass -- if it is the shaper's realm, do not resize
    const mapClass = {
      map: mapStore.isMapShown,
      shaperId: isShaperId
    }
    // currency transaction classes:
    const currencyClass = {
      sextanted: mapStore.sextanted,
    }
    // props for filter highlight component
    const mapProps = {
      highlightStyle,
      mapStore,
    };
    const shaperCircleProps = {
      shaperOrbStyle,
      mapStore,
    }

    // determine map image based on shaped state
    const mapStyle = mapStore.shaped ? shapedMapImageStyle : mapImageStyle;
    const shaperOrbMap = mapStore.hasShaperOrb ? <div className="shaperOrb" style={shaperOrbStyle}></div> : null;

    return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
          <div className={cx(mapClass)} style={mapStyle} onClick={this.executeAtlasAction}>
          </div>
        </OverlayTrigger>
        {/*blue circle indicating map can be shaped*/}
        <ShaperOrbCircle mapProps={shaperCircleProps}></ShaperOrbCircle>
        {/*component activates highlight div based on filter var*/}
        <MapHighlight mapProps={mapProps}></MapHighlight>
        <ShapedHighlight mapProps={mapProps}></ShapedHighlight>
        <div className={cx(currencyClass)} style={sextantStyle}></div>
      </div>
    );
  }
}
export default Map;