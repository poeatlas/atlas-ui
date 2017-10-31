import React from 'react';
import { Popover } from 'react-bootstrap';

export function getPopover(name, tier, level, shaped) {

  // map information popup
  return (
    <Popover id="popover-trigger-hover-focus" title={name + " Map"}>
      <strong>Tier: </strong> { tier } <br />
      { shaped ? <div><strong>{"Base Tier:"} </strong>{tier - 5} <br /></div> : null}
      <strong>Area Level: </strong> { level } <br />
    </Popover> 
  )
}
