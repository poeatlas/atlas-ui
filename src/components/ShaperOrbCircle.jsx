import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject("AtlasStore") @observer
class ShaperOrbCircle extends Component {
  
  render() {
    const {positionStyle, mapStore} = this.props;
    const classStyle = {
      circle: true,
      shaperOrb: true,
      rotate: true,
      borderDottedBlue: mapStore.hasShaperOrb,
      borderDottedYellow: mapStore.usedShaperOrb,
    }

    return (
      <div className={cx(classStyle)} style={positionStyle}></div>
    )
  }
}

export default ShaperOrbCircle;