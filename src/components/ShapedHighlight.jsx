import React, { Component } from 'react';
import cx from 'classnames';

class ShapedHighlight extends Component {

  render() {
    const { mapStore } = this.props.mapProps;
    const highlightState = mapStore.highlighted;
    const highlightClass = {
      circle: highlightState,
      highlight: highlightState,
      flicker: highlightState,
      blueBorderFill: highlightState,
    }
    return (
      <div className={cx(highlightClass)} style={this.props.mapProps.highlightStyle}></div>
    );
  }
}

export default ShapedHighlight;