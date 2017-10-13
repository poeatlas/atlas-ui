import React, { Component } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

@observer
class MapHighlight extends Component {

  render() {
    const { mapStore, positionStyle } = this.props;
    const highlightState = mapStore.highlighted;
    const highlightClass = {
      circle: highlightState,
      highlight: highlightState,
      flicker: highlightState,
      yellowBorderFill: highlightState,
    }
    return (
      <div className={cx(highlightClass)} style={positionStyle}></div>
    );
  }
}

export default MapHighlight;