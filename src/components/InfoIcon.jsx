import React, { Component } from 'react';
import { InputGroup, Popover, OverlayTrigger } from 'react-bootstrap';

class InfoIcon extends Component {
  render() {
    const INFO_TITLE="Highlights maps on the atlas that match the keywords you specify.";
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Type mutliple keywords by separating them with a space</li>
          <li>Search for map tier by typing tier:X</li>
          <li>Click the shaper icon to reveal maps containg a shaper orb</li>
        </ul>
      </Popover>
    );

    return (

      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
        <InputGroup.Addon>
          <span className="fa fa-info" aria-hidden="true"></span>
        </InputGroup.Addon>
      </OverlayTrigger>

      
    );
  }
}
export default InfoIcon;