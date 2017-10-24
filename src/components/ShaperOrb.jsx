import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("atlasStore") @observer
class ShaperOrb extends Component {
  constructor(props) {
    super(props);
    this.activateShaperOrb = this.activateShaperOrb.bind(this);
  }

  activateShaperOrb() {
    const atlasStore = this.props.atlasStore;

    atlasStore.setShaperOrb(!atlasStore.shaperOrbState); 
  }

  render() {
    const shaperOrbState = this.props.atlasStore.shaperOrbState;
    
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      orb: true,
      toggle: shaperOrbState, 
    }

    return (
      <Button onClick={this.activateShaperOrb} active={!!shaperOrbState}>
        <div className={cx(mapClass)}></div>
      </Button>
    );
  }
}
export default ShaperOrb;