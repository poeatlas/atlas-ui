import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { OverlayTrigger } from 'react-bootstrap';
import cx from 'classnames';

import { getPopover } from './MapPopover';

@inject("atlasStore") @observer
class MenuMap extends Component {
  constructor(props) {
    super(props);

    this.assignShaperOrb = this.assignShaperOrb.bind(this);
  }

  assignShaperOrb() {
    const {atlasStore} = this.props;
    const {map, orbMap} = this.props.mapProps;
    console.log( 'orb map shaped map id: ' + orbMap.shapedMapId + ' map id: ' + map.id);
    // if orbmap already used and curr map doese not already have shapedbyid:
      // if used to shape this map, reset shapedbyid of this map and shapedmapid of orbmap
      // if used to shape another map, set set map shapedmapid to orbmap and orbmap shapedmapid to this map
    // if orbmap alraedy used and curr map is already shaped
      // switch orbmaps's shaped map to curr map
      // curr map's shaped by orb map's shaped map is now this map's previous shapedby orbmap
    // if orbmap not used, set currmap's shapedbyid to orbmap and orbmap's shapedmapid to this map
    if (orbMap.usedShaperOrb) {
      if (map.shapedById !== -1) {
        console.log("check 3");
        const prevOrbMap = atlasStore.mapList[map.shapedById];
        prevOrbMap.usedShaperOrb = false;
        prevOrbMap.shapedMapId = -1;

        map.shapedById = orbMap.id;
        orbMap.shapedMapId = map.id;
        orbMap.usedShaperOrb = true;
      } 
      else if (map.shapedById === -1) {
        console.log("check 1")
        if (orbMap.shapedMapId !== map.id) {
          const prevShapedMap = atlasStore.mapList[orbMap.shapedMapId];
          
          prevShapedMap.shapedById = -1;
          orbMap.shapedMapId = map.id;
          map.shapedById = orbMap.id;
        }
      } else if (orbMap.shapedMapId === map.id) {
          console.log("check 2");
          orbMap.usedShaperOrb = false;
          orbMap.shapedMapId = -1;
          map.shapedById = -1;
      }
      
      else {
        console.log("check 4");
        const otherOrbMapId = map.shapedById;
        const prevShapedMapId = orbMap.shapedMapId;
        const otherOrbMap = atlasStore.mapList[otherOrbMapId];
        const prevShapedMap = atlasStore.mapList[prevShapedMapId];

        orbMap.shapedMapId = map.id;
        map.shapedById = orbMap.id;
        otherOrbMap.shapedMapId = prevShapedMapId;
        prevShapedMap.shapedById = otherOrbMapId;
      }
    }
    else {
      console.log("check 5 - basic");
      map.shapedById = orbMap.id;
      orbMap.shapedMapId = map.id;
      orbMap.usedShaperOrb = true;
    }
    console.log( 'orb map shaped map: ' + atlasStore.mapList[orbMap.shapedMapId].name + ' with ' + atlasStore.mapList[map.shapedById].name);
  }
  render() {
    const {map, orbMap} = this.props.mapProps;
    const mapClass = {
      map: true,
      menu: true,
      shaped: true,
      opaque: map.shapedById === orbMap.id && orbMap.usedShaperOrb,
    }
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                            overlay={getPopover(orbMap.name, orbMap.tier, orbMap.mapLevel)}>
        <div className={cx(mapClass)} 
                    onClick={this.assignShaperOrb}
                    style={{backgroundImage: `url(./${orbMap.iconPath})`}}></div>
      </OverlayTrigger>
    );
  }
}
export default MenuMap;