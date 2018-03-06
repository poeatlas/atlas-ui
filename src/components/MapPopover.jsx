import React from 'react';
// import {Popover, Tooltip} from 'react-bootstrap';
import './Popover.css';


export function getPopover(mapStore) {

  // map information popup
  return (
    <div className='customPopover'>
      <div className='customPopoverTitle'>{mapStore.name} Map</div>
      <div className='customPopoverBody'>
        <strong>Tier: </strong> { mapStore.tier } <br />
        { mapStore.shaped || mapStore.eldered ?
            <div><strong>{"Base Tier:"} </strong>{mapStore.baseTier} <br /></div> : null}
        <strong>Area Level: </strong> { mapStore.mapLevel } <br />
      </div>
    </div>
  )
}
