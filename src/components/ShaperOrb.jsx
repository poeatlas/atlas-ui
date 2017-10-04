import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
    const { mapStore } = this.props;
    atlasStore.setShaperOrb(!atlasStore.shaperOrbState); 
    
    // show only maps that have unused shaper orb
    for (var i = 0; i < mapStore.length; i++) {
      const currMap = mapStore[i];
      if ( atlasStore.shaperOrbState ) {
        if ( currMap.hasShaperOrb) {
          currMap.isHidden = false;
          currMap.shapehighlighted = true;
        } else {
          currMap.isHidden = true;
          currMap.shapehighlighted = false;
        }
      } else {
        currMap.isHidden = false;
      }
    }
  }
  render() {
    const shaperOrbState = this.props.AtlasStore.shaperOrbState;
    // determine if orb is active
    const mapClass = {
      orb: !shaperOrbState,
      orbToggle: shaperOrbState, 
    }

    return (
        <Button onClick={this.activateShaperOrb} active={!!shaperOrbState}>
          <div className={cx(mapClass)}></div>
        </Button>
    );
  }
}
export default ShaperOrb;