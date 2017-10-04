import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject("AtlasStore") @observer
class ShapedHighlight extends Component {
  highlightChange() {
    const {mapStore} = this.props.mapProps
    if (this.props.AtlasStore.shaperOrbState && mapStore.shapeHighlighted ) {
      return "shapedHighlight";
    }
    return "";
  }

  render() {
    return (
      <div className={this.highlightChange()} style={this.props.mapProps.highlightStyle}></div>
    )
  }
}

export default ShapedHighlight;