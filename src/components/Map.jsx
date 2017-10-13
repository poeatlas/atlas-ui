import React, { Component } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import { MAP_MULTIPLIER, SHAPER_ORB_MAP_ARRAY } from '../const';
import MapHighlight from './MapHighlight';
import ShaperOrbCircle from './ShaperOrbCircle';
import UnshapeDialogue from './UnshapeDialogue';
import { getPositionStyle } from '../lib/MapUtil';

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
    else if (atlasStore.shaperOrbState && mapStore.shapedIconPath) {
      const shapedState = !mapStore.shaped;
      
      // automatically use shaper orbs for tiers 1 to 6 maps as there is only one
      if( mapStore.baseTier <= 6) {
        const shapingMap = mapList[SHAPER_ORB_MAP_ARRAY[mapStore.baseTier][0]];
        // check if shaping map already shapes a map that is not current map
        if (shapingMap.usedShaperOrb && shapingMap.shapedMapId !== mapStore.id) {
          mapStore.showUnshapeModal = true;
          console.log("how'd we get here");
        }
        shapingMap.usedShaperOrb = shapedState;

        if (shapedState) {
          mapStore.shapedById = shapingMap.id;
          shapingMap.shapedMapId = mapStore.id;
        } else {
          // reset shaped map id to -1 (shaper orb map no longer shapes a map)
          shapingMap.shapedMapId = -1;
        }
      } else if (mapStore.baseTier > 6 && mapStore.baseTier <= 10) {

      }
      mapStore.shaped = shapedState;
    }
  }

  render() {
    const { mapStore, mapList } = this.props;
    const SHAPERS_REALM_ID = 125;
    const isShaperId = mapStore.id===SHAPERS_REALM_ID;
    
    // map information popup
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={mapStore.name + " Map"}>
        <strong>Tier: </strong> { mapStore.tier } <br />
        <strong>Area Level: </strong> { mapStore.mapLevel } <br />
      </Popover>
    );
    // position of map objects
    const positionStyle = getPositionStyle(mapStore);

    // shaped map image position for div
    const shapedMapImageStyle = {
      backgroundImage: `url(./${mapStore.shapedIconPath})`,
    };
    // shaped map image position for div
    const mapImageStyle = {
      backgroundImage: `url(./${mapStore.iconPath})`,
    };
    // determine mapClass -- if it is the shaper's realm, do not resize
    const mapClass = {
      map: mapStore.isMapShown,
      shaperId: isShaperId
    };
    // sextant class style:
    const sextantCircleClass = {
      circle: mapStore.sextanted,
      rotate: mapStore.sextanted,
      borderDottedRed: mapStore.sextanted,
      sextanted: mapStore.sextanted,
    };
    const dialogueProps = {
      mapList,
      mapStore,
    };
    // determine map image based on shaped state
    const mapStyle = mapStore.shaped ? shapedMapImageStyle : mapImageStyle;

    return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
          <div className={cx(mapClass)} style={{...mapStyle, ...positionStyle}} onClick={this.executeAtlasAction}>
          </div>
        </OverlayTrigger>
        
        {/*blue circle indicating map can be shaped*/}
        <ShaperOrbCircle mapStore={mapStore} positionStyle={positionStyle}></ShaperOrbCircle>
        
        {/*component activates highlight div based on filter var*/}
        <MapHighlight mapStore={mapStore} positionStyle={positionStyle}></MapHighlight>

        {/*modal dialogue when user attempts to shape a map beyond limit */}
        <UnshapeDialogue mapProps={dialogueProps} />

        <div className={cx(sextantCircleClass)} style={positionStyle}></div>
      </div>
    );
  }
}
export default Map;