import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

import * as sextantBlock from '../sextantBlock';

@inject("mapStore") @observer
class SextantBlock extends Component {

  render() {
    const { mapStore } = this.props;

    const mapBlockState = mapStore.blockState;
    const blockMask = mapStore.blockMask;
    
    const markClass = {
      circle: mapBlockState !== sextantBlock.NO_LAYER,
      highlight: mapBlockState !== sextantBlock.NO_LAYER,
      // flicker: mapBlockState > 0,
      // yellowBorderFill: mapBlockState === sextantBlock.LAYER_ZERO,
      greenBorderFill: blockMask === 1,
      redBorderFill: blockMask === 2,
      blueBorderFill: blockMask === 4,
    }

    return (
      <div className={cx(markClass)} style={this.props.positionStyle}></div>
    );
  }
}

export default SextantBlock;