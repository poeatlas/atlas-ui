import React, {Component} from 'react';
import { Table, } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import {SHAPER_ORB_HIGH_MAP_ARRAY} from "../const";
import { getPopover } from './MapPopover';
import MenuMap from './MenuMap';

@inject("ModalStore", "atlasStore") @observer
class ShaperOrbAssignBody extends Component {

  renderTable() {
    const {atlasStore} = this.props;
    
    return (
      atlasStore.sortedShapedMapList.map((map) =>
        <tr key={map.id}>
          <td key={map.id}>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                            overlay={getPopover(map.name, map.tier, map.mapLevel, map.shaped)}>
              <div className="map menu shaped" style={{backgroundImage: `url(./${map.shapedIconPath})`}}></div>
            </OverlayTrigger>
          </td>
          {this.renderTableOrbMaps(map).map((row) => row)}
        </tr>
      )
    )
  }

  // row data for shaper or maps
  renderTableOrbMaps(map) {
    const MIN_MAP_TIER = 7;
    const shaperOrbMapArr = SHAPER_ORB_HIGH_MAP_ARRAY[map.baseTier-MIN_MAP_TIER]
    const tdArr = [];
    const {atlasStore} = this.props;
    console.log(shaperOrbMapArr);
    for (var i = 0; i < 3; i++) {
      if (shaperOrbMapArr[i]) {
        const orbMap = atlasStore.mapList[shaperOrbMapArr[i].id];
        tdArr.push(
          <td key={i}>
            <MenuMap mapProps={{map, orbMap}}/>
          </td>
        )
      } else {
        tdArr.push(
          <td key={i}></td>
        )
      }
    }
    return tdArr;
  }

  render() {
    return (
      <Table responsive condensed hover>
        <thead>
          <tr>
            <th>Shaped Map</th>
            <th colSpan="3">Shaper Orb Maps</th>
          </tr>
        </thead>
        <tbody>
        {this.renderTable()}
        </tbody>
      </Table>
    )
  }
}

export default ShaperOrbAssignBody;