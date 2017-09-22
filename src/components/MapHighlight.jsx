import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("MapStore")
@observer
class MapHighlight extends Component {
  filterChange() {
    // var matchFilter = new RegExp(this.props.MapStore.filter, "i");
    const filter = this.props.MapStore.filter.toLowerCase();
    const areaName = this.props.mapProps.areaNameStr;
    var tier = null;
    if(filter.startsWith("tier:")) {
      tier = parseInt(filter.substring(5), 10);
    }
    // check if filter matches map based on name or tier level
    if ((filter && filter.length <= areaName.length) 
      && (areaName.indexOf(filter) !== -1 
      || tier === this.props.mapProps.MAP_TIER ) ) {
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