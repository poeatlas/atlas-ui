import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject("AtlasStore") @observer
class ShaperOrbCircle extends Component {
  
  render() {
    const {shaperOrbStyle, mapStore} = this.props.mapProps;
    const classStyle = {
      shaperOrb: mapStore.hasShaperOrb,
      usedShaperOrb: mapStore.usedShaperOrb,
    }

    return (
      <div className={cx(classStyle)} style={shaperOrbStyle}></div>
    )
  }
}

export default ShaperOrbCircle;