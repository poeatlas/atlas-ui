import React, { Component } from 'react';
import { InputGroup, OverlayTrigger } from 'react-bootstrap';

class InfoIcon extends Component {
  render() {
    const INFO_TITLE="Misc Information";
    const popoverHoverFocus = (
      <div className="customPopover info">
        <div className="customPopoverTitle infoTitle">{INFO_TITLE}</div>
        <div className="customPopover infoContent">
          <strong>Tips:</strong> <br />
          <ul>
            <li>Type mutliple keywords by separating them with a space</li>
            <li>Search for map tier by typing tier:X</li>
            <li>Right click a map to toggle sextant blocking visual for the map.
              Note that sextant button does not need to be activated.</li>
          </ul>
        </div>
      </div>
    );

    return (

      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" container={this} overlay={popoverHoverFocus}>
        <InputGroup.Addon className="infoSize">
          <span className="fa fa-info" aria-hidden="true"></span>
        </InputGroup.Addon>
      </OverlayTrigger>

      
    );
  }
}
export default InfoIcon;