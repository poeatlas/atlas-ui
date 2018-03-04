import React from 'react';
// import {Popover, Tooltip} from 'react-bootstrap';
import './Popover.css';


export function getPopover(name, tier, level, shaped) {

  // map information popup
  return (
    //<Popover id="popover-positioned-scrolling-top" title={name + " Map"} style={`popoverPad`} >
    //  <strong>Tier: </strong> { tier } <br />
    //  { shaped ? <div><strong>{"Base Tier:"} </strong>{tier - 5} <br /></div> : null}
    //  <strong>Area Level: </strong> { level } <br />
    // </Popover>
    <div className='customPopover'>
      <div className='customPopoverTitle'>{name} Map</div>
      <div className='customPopoverBody'>
        <strong>Tier: </strong> { tier } <br />
        { shaped ? <div><strong>{"Base Tier:"} </strong>{tier - 5} <br /></div> : null}
        <strong>Area Level: </strong> { level } <br />
      </div>
    </div>
  )
}
