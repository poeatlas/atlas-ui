import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import MapHighlight from './MapHighlight';
import ShaperOrbCircle from './ShaperOrbCircle';
import { getPopover } from './MapPopover';
import { getPositionStyle, getShapingMap, getPrevShapedMap } from '../lib/MapUtil';

@inject("atlasStore", "ModalStore") @observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.executeAtlasAction = this.executeAtlasAction.bind(this);
  }
  // click event on map div--set states for sextanted, sealed, shaped
  executeAtlasAction() {
    const { mapStore, mapList, atlasStore, ModalStore } = this.props;
    atlasStore.activeMap = mapStore;
    
    // toggle seal state
    atlasStore.sealState && atlasStore.toggleSealState();
    // toggle sextant state
    atlasStore.sextantState && atlasStore.toggleSextantState();
    
    // toggle shape state if map is shapable
    if (atlasStore.shaperOrbState) {
      if (mapStore.baseTier <= 6) {
        const shapingMap = getShapingMap(mapList,mapStore);
        const prevShapedMap = getPrevShapedMap(mapList,shapingMap);
        if (shapingMap.usedShaperOrb && prevShapedMap.id !== mapStore.id) {
          ModalStore.setModalValues({
            title: "Shaping Orb Tier Limit Reached",
            body: "Only one map can be shaped for this tier. Do you want to unshape the " + prevShapedMap.worldAreasName + " Map?",
            shown: true,
            callback: () => {
              atlasStore.switchShaping();
              ModalStore.shown = false;
            }
          })
          return;
        }
      }
      atlasStore.toggleShapedState();
    }
  }

  render() { 
    const { mapStore } = this.props;
    const SHAPERS_REALM_ID = 125;
    const isShaperId = mapStore.id===SHAPERS_REALM_ID;

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
    // determine map image based on shaped state
    const mapStyle = mapStore.shaped ? shapedMapImageStyle : mapImageStyle;
    return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                        overlay={getPopover(mapStore.name, mapStore.tier, mapStore.mapLevel)}>
          <div className={cx(mapClass)} style={{...mapStyle, ...positionStyle}} onClick={this.executeAtlasAction}></div>
        </OverlayTrigger>
        
        {/*blue circle indicating map can be shaped*/}
        <ShaperOrbCircle mapStore={mapStore} positionStyle={positionStyle}></ShaperOrbCircle>
        
        {/*component activates highlight div based on filter var*/}
        <MapHighlight mapStore={mapStore} positionStyle={positionStyle}></MapHighlight>

        <div className={cx(sextantCircleClass)} style={positionStyle}></div>
      </div>
    );
  }
}
export default Map;