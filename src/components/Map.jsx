import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import MapHighlight from './MapHighlight';
import ShaperOrbCircle from './ShaperOrbCircle';
import SextantBlock from './SextantBlock';
import { getPopover } from './MapPopover';
import { getPositionStyle, executeLowShapeModal, executeHighShapeModal, imageSelect } from '../lib/MapUtil';
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

    const { mapStore, mapList, atlasStore, ModalStore } = this.props;
    atlasStore.activeMap = mapStore;
    // toggle seal state
    atlasStore.sealState && atlasStore.toggleSealState();
    // toggle sextant state
    atlasStore.sextantState && atlasStore.toggleSextantState();

    if (event.shiftKey && atlasStore.sextantState) {
      atlasStore.autoSextant();
    }

    // toggle shape state if map is shapable
    if (atlasStore.shaperOrbState && mapStore.shapedIconPath && !mapStore.sealed) {
      const mapBaseTier = mapStore.baseTier;
      if (mapBaseTier <= 7) {
        if (executeLowShapeModal(mapStore, mapList, atlasStore, ModalStore)) {
          return;
        }
        atlasStore.toggleLowShapedState();
      } else if (mapBaseTier > 7 && mapStore.baseTier <= 10) {
          if( executeHighShapeModal(mapStore, mapList, atlasStore, ModalStore) ) {
            return;
          }
        atlasStore.toggleHighShapedState();
      }
    }
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
    const SHAPERS_REALM_ID = 125;
    const isShaperId = mapStore.id===SHAPERS_REALM_ID;
    // position of map objects
    const positionStyle = getPositionStyle(mapStore);

    // determine mapClass -- if it is the shaper's realm, do not resize
    const mapClass = {
      map: true,
      shaperId: isShaperId,
    };
    // sextant class style:
    const sextantCircleClass = {
      circle: mapStore.sextanted,
      rotate: mapStore.sextanted,
      borderDottedRed: mapStore.sextanted,
      sextanted: mapStore.sextanted,
    };

    const tooltip = (
      <Tooltip id="tooltip">
        <strong>Holy guacamole!</strong> Check this info.
      </Tooltip>
    );

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={"Map"}>
        <strong>Tier: </strong> { "hi" } <br />
      </Popover>
    );
    return (
      <div>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                        overlay={getPopover(mapStore.name, mapStore.tier, mapStore.mapLevel, mapStore.shaped)}
                        /* overlay={popoverHoverFocus} style={positionStyle}*/>
          <div className={cx(mapClass)} style={{...imageSelect(mapStore), ...positionStyle}} 
            onClick={this.handleAtlasAction}
            onContextMenu={this.handleRightClick}></div>
        </OverlayTrigger>
        
        {/*blue circle indicating map can be shaped*/}
        <ShaperOrbCircle mapStore={mapStore} positionStyle={positionStyle}></ShaperOrbCircle>
        
        {/*component activates highlight div based on filter var*/}
        <MapHighlight mapStore={mapStore} positionStyle={positionStyle}></MapHighlight>

        <SextantBlock mapStore={mapStore} positionStyle={positionStyle} />
        <div className={cx(sextantCircleClass)} style={positionStyle}></div>
      </div>
    );
  }
}
export default withRouter(Map);