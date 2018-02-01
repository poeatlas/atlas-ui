import React, { Component } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("atlasStore") @observer
class Seal extends Component {
  constructor(props) {
    super(props);
    this.activateSeal = this.activateSeal.bind(this);
  }

  activateSeal() {
    const atlasStore = this.props.atlasStore;
    atlasStore.setSeal(!atlasStore.sealState);
  }

  render() {
    const sealState = this.props.atlasStore.sealState;
    const INFO_TITLE="Activate Map Sealing";
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Left click a map to toggle sealing (removal) from the Atlas.</li>
          <li>Sealed maps are considered uncomplete and unshaped.</li>
        </ul>
      </Popover>
    );
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      seal: true,
      toggle: sealState, 
    }
    
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
          <Button onClick={this.activateSeal} active={!!sealState}>
            <div className={cx(mapClass)}></div>
          </Button>
      </OverlayTrigger>
    );
  }
}
export default Seal;