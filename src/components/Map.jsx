import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import './Map.css';
import MapHighlight from './MapHighlight';
import SextantBlock from './SextantBlock';
import { getPopover } from './MapPopover';
import { getPositionStyle, refreshSearch, imageSelect, imageSelectBase, imageSelectIcon, imageSelectRing }
  from '../lib/MapUtil';
import HistoryUtil from '../lib/HistoryUtil';

@inject("atlasStore", "ModalStore") @observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.handleAtlasAction = this.handleAtlasAction.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  // click event on map div--set states for sextanted, sealed, shaped
  handleAtlasAction(event) {
    if (event.type === "contextmenu") {
      return;
    }

    const { mapStore, atlasStore } = this.props;
    atlasStore.activeMap = mapStore;
    // toggle seal state
    atlasStore.sealState && atlasStore.toggleSealState();
    // toggle sextant state
    atlasStore.sextantState && atlasStore.toggleSextantState();
    // toggle shape state
    atlasStore.shaperOrbState && mapStore.baseTier < 11 && !mapStore.unique && atlasStore.toggleShapeState();
    // toggle shape state
    atlasStore.elderOrbState && mapStore.baseTier < 16 && !mapStore.unique && atlasStore.toggleElderState();

    if (event.shiftKey && atlasStore.sextantState) {
      atlasStore.autoSextant();
    }

    // check if map needs to be highlighted based on existing search string and changes
    refreshSearch(mapStore,atlasStore);

    // store history
    const historyUtil = new HistoryUtil(atlasStore, this.props.history);
    historyUtil.recalculateHistory();
  }

  handleRightClick(e) {
    const { mapStore, atlasStore } = this.props;
    atlasStore.activeMap = mapStore;

    e.stopPropagation();
    e.preventDefault();

    // show sextant blocking if right click
    atlasStore.resetSextantBlock();
    atlasStore.displaySextantBlock(mapStore);
  }

  render() { 
    const { mapStore } = this.props;
    const SHAPERS_REALM_ID = 156;
    const isShaperId = mapStore.id===SHAPERS_REALM_ID;
    const positionStyle = getPositionStyle(mapStore); // position of map objects
    const tier = mapStore.tier;
    let shapeDiv = null;
    let mapDiv = null;

    // determine mapClass -- if it is the shaper's realm, do not resize
    const mapClass = {
      map: true,
      shaperId: isShaperId,
    };
    // determine what color to mask ggg's white/transparent map image parts
    const maskClass = {
      shaperId: isShaperId,
      mask: true,
      white: tier < 6,
      yellow: (tier > 5 && tier < 11),
      red: tier > 10,
    };
    // sextant class style:
    const sextantCircleClass = {
      circle: mapStore.sextanted,
      rotate: mapStore.sextanted,
      borderDottedRed: mapStore.sextanted,
      sextanted: mapStore.sextanted,
    };

    //show/hide shaped map ring
    if (mapStore.shaped || mapStore.eldered) {
      shapeDiv = <div className={cx(maskClass)} style={{...imageSelectRing(mapStore), ...positionStyle}} />;
    } else {
      shapeDiv = null;
    }

    // map div dependent on unique or if guardian map
    if (mapStore.unique || mapStore.baseTier > 15) {
      mapDiv = <div className={cx(mapClass)} style={{...imageSelect(mapStore), ...positionStyle}} />
    } else {
      mapDiv = <div>
        <div className={'mask'} style={{...imageSelectBase(mapStore), ...positionStyle}} />
        <div className={cx(maskClass)} style={{...imageSelectIcon(mapStore), ...positionStyle}} />
      </div>
    }

    return (
        <div style={{position: `relative`}}>
          <OverlayTrigger trigger={['hover']} placement="top" container={this}
                          overlay={getPopover(mapStore)}>
            <div className='mapMain' style={{...positionStyle}}
                 onClick={this.handleAtlasAction}
                 onContextMenu={this.handleRightClick}
            />
          </OverlayTrigger>

          {/*component activates highlight div based on filter var*/}
          <SextantBlock mapStore={mapStore} positionStyle={positionStyle} />
          <MapHighlight mapStore={mapStore} positionStyle={positionStyle} />

          {/*get map images (base, icon, and ring if shaped*/}
          {mapDiv}
          {shapeDiv}

          <div className={cx(sextantCircleClass)} style={positionStyle} />
        </div>
    );
  }
}
export default withRouter(Map);