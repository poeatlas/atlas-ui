import React, { Component } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
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
    const INFO_TITLE="Activate Map Shaping";
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Left click a map to toggle its shape state.</li>
        </ul>
      </Popover>
    );
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      orb: true,
      toggle: shaperOrbState, 
    }

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
        <Button onClick={this.activateShaperOrb} active={!!shaperOrbState}>
          <div className={cx(mapClass)}></div>
        </Button>
      </OverlayTrigger>
    );
  }
}
export default ShaperOrb;