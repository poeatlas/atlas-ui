import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class MapHighlight extends Component {
  filterChange() {
    if (this.props.mapProps.mapStore.highlighted) {
      return "highlight";
    } 
    return "";
  }

  render() {
    return (
      <div className={this.filterChange()} style={this.props.mapProps.highlightStyle}></div>
    );
  }
}

export default MapHighlight;