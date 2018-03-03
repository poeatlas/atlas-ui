import React, { Component } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

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
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Left click a map to toggle sextant application.</li>
          <li>Shift+left click a map to sextant and sextant block relevant surrounding maps.</li>
          <li>Right click a map to toggle sextant blocking visual for the map.</li>
        </ul>
      </Popover>
    );
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      sextant: true,
      toggle: sextantState, 
    }
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
        <Button onClick={this.activateSextant} active={!!sextantState}>
          <div className={cx(mapClass)}></div>
        </Button>
      </OverlayTrigger >
    );
  }
}
export default Sextant;