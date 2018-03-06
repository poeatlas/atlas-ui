import React, { Component } from 'react';
import { OverlayTrigger, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import './Popover.css';

@inject("atlasStore") @observer
class Sextant extends Component {
  constructor(props) {
    super(props);
    this.activateSextant = this.activateSextant.bind(this);
  }

  activateSextant() {
    const atlasStore = this.props.atlasStore;
    atlasStore.setSextant(!atlasStore.sextantState);
  }

  render() {
    const sextantState = this.props.atlasStore.sextantState;
    const INFO_TITLE="Activate Map Sextanting";
    const popoverHoverFocus = (
      <div className="customPopover info">
        <div className="customPopoverTitle infoTitle">{INFO_TITLE}</div>
        <div className="customPopover infoContent">
          <strong>Tips:</strong> <br />
          <ul>
            <li>Left click a map to toggle sextant application.</li>
            <li>Shift+left click a map to sextant and sextant block relevant surrounding maps.</li>
            <li>Right click a map to toggle sextant blocking visual for the map.</li>
          </ul>
        </div>
      </div>
    );
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      sextant: true,
      toggle: sextantState, 
    }
    return (
      <OverlayTrigger trigger={['hover']} placement="bottom" container={this} overlay={popoverHoverFocus}>
        <Button onClick={this.activateSextant} active={!!sextantState}>
          <div className={cx(mapClass)}></div>
        </Button>
      </OverlayTrigger >
    );
  }
}
export default Sextant;