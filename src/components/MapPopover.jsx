import React from 'react';
import { Popover } from 'react-bootstrap';

export function getPopover(name, tier, level) {
  // map information popup
  return (
    <Popover id="popover-trigger-hover-focus" title={name + " Map"}>
      <strong>Tier: </strong> { tier } <br />
      <strong>Area Level: </strong> { level } <br />
    </Popover> 
  )
}
