import React, { Component } from 'react';
import { OverlayTrigger, Button } from 'react-bootstrap';
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
      <div className="customPopover info">
        <div className="customPopoverTitle infoTitle">{INFO_TITLE}</div>
        <div className="customPopover infoContent">
          <strong>Tips:</strong> <br />
          <ul>
            <li>Left click a map to toggle its shape state.</li>
          </ul>
        </div>
      </div>
    );
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      orb: true,
      toggle: shaperOrbState, 
    }

    return (
      <Button onClick={this.activateShaperOrb} active={!!shaperOrbState}>
        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" container={this} overlay={popoverHoverFocus}>
          <div className={cx(mapClass)}></div>
        </OverlayTrigger>
      </Button>
    );
  }
}
export default ShaperOrb;