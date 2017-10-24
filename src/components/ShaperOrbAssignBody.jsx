import React, {Component} from 'react';
import { Table, } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import {SHAPER_ORB_HIGH_MAP_ARRAY} from "../const";
import { getPopover } from './MapPopover';

@inject("ModalStore", "atlasStore") @observer
class ShaperOrbAssignBody extends Component {

  render() {
    const {atlasStore} = this.props;

    return (
      /*<Grid fluid={true}>
        <FormGroup>
        {atlasStore.shapedMapList.map((map) => 
          <Row className="show-grid" key={map.id} style={{height: "35px"}}>
            <Col md={2}></Col>
            <Col md={2} className="border-right-black" key={map.id} style={{height: "35px"}}>
              <div className="map menu shaped" style={{backgroundImage: `url(./${map.shapedIconPath})`}}></div>
            </Col>
            <InputGroup.Button>
            {SHAPER_ORB_HIGH_MAP_ARRAY[map.baseTier-7].map((orbMap) =>
              <Button key={orbMap.id}>
                <Col md={2} className="hand">
                  <div className="map menu" style={{backgroundImage: `url(./${orbMap.iconPath})`}}></div>
                </Col>
              </Button>
            )}
            </InputGroup.Button>
            <Col md={2}></Col>
          </Row>
        )}
        </FormGroup>
      </Grid>*/
      <Table responsive condensed hover>
        <thead>
          <tr>
            <th>Shaped Map</th>
            <th colSpan="3">Shaper Orb Maps</th>
          </tr>
        </thead>
        <tbody>
          {atlasStore.sortedShapedMapList.map((map) => 
            <tr key={map.id}>
              <td key={map.id}>
                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                overlay={getPopover(map.name,map.tier ? map.tier : map.level - 67, map.mapLevel ? map.mapLevel : map.level)}>
                  <div className="map menu shaped" style={{backgroundImage: `url(./${map.shapedIconPath})`}}></div>
                </OverlayTrigger>
              </td>
              
              {SHAPER_ORB_HIGH_MAP_ARRAY[map.baseTier-7].map((orbMap) =>
                <td key={orbMap.id}>
                  <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={getPopover(orbMap.name,orbMap.tier ? orbMap.tier : orbMap.level - 67, orbMap.mapLevel ? orbMap.mapLevel : orbMap.level)}>
                    <div className="map menu shaped" style={{backgroundImage: `url(./${orbMap.iconPath})`}}></div>
                  </OverlayTrigger>
                </td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default ShaperOrbAssignBody;