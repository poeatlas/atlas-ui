import React, { Component } from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("AtlasStore") @observer
class ShaperOrb extends Component {
  constructor(props) {
    super(props);
    this.activateShaperOrb = this.activateShaperOrb.bind(this);
  }

  activateShaperOrb() {
    const atlasStore = this.props.AtlasStore;
    const { mapList } = this.props;

    atlasStore.setShaperOrb(!atlasStore.shaperOrbState); 
    
    // show only maps that have unused shaper orb
    // for (var i = 0; i < mapList.length; i++) {
    //   const currMap = mapList[i];

    //   if ( atlasStore.shaperOrbState ) {
    //     if ( currMap.hasShaperOrb) {
    //       console.log(currMap);
    //       currMap.toggleShaperOrbMap(true)
    //     } else {
    //       currMap.toggleShaperOrbMap(false);
    //     }
    //   } else {
    //     currMap.isHidden = false;
    //   }
    // }
  }


  render() {
    const { mapList } = this.props;
    const shaperOrbState = this.props.AtlasStore.shaperOrbState;
    // determine if orb is active
    const mapClass = {
      orb: !shaperOrbState,
      orbToggle: shaperOrbState, 
    }

    /*const popoverShaperOrb = (
      <Popover id="popover-positioned-scrolling-bottom" title="Shaping Maps">
        <strong> Instructions: </strong> Click a map to shape it. Only non-unique
        and maps whose tier is lower than 11 can be shaped.
      </Popover>
    )*/
    return (
      /*<OverlayTrigger trigger='click' 
          placement='right' 
          overlay={popoverShaperOrb}>*/
        <Button onClick={this.activateShaperOrb} active={!!shaperOrbState}>
          <div className={cx(mapClass)}></div>
        </Button>
      /*</OverlayTrigger>*/
    );
  }
}
export default ShaperOrb;