import React, { Component } from 'react';
import cx from 'classnames';

import sextantBlock from '../sextantBlock';

class SextantBlock extends Component {

  render() {
    const { mapStore } = this.props;
    const highlightState = mapStore.highlighted;
    const mapBlockState = mapStore.blockState;

    const markClass = {
      circle: mapBlockState > 0,
      highlight: mapBlockState > 0,
      flicker: mapBlockState > 0,
      blueBorderFill: mapBlockState === sextantBlock.LAYER_ROOT,
      greenBorderFill: mapBlockState === sextantBlock.LAYER_ONE,
      redBorderFill: mapBlockState === sextantBlock.LAYER_TWO,
      yellowBorderFill: mapBlockState === sextantBlock.LAYER_THREE,
    }

    return (
      <div className={cx(markClass)} style={this.props.positionStyle}></div>
    );
  }
}

export default SextantBlock;