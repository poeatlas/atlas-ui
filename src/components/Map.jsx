import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("MapStore")
@observer
class Map extends Component {

  filterChange() {
    // var matchFilter = new RegExp(this.props.MapStore.filter, "i");
    const filterStr = this.props.MapStore.filter.toLowerCase();
    console.log(filterStr);
    if (this.props.mapProps.areaNameStr.toLowerCase().indexOf(filterStr) !== -1) {
      return { opacity: '1' };
    } else {
      return { opacity: '0.5' };
    }
  }

  render() {
    const {isShaperId} = this.props.mapProps;
    // determine class of div
    const mapClass = {
      map: true,
      shaperId: isShaperId
    }
  return (
      <div className={cx(mapClass)}></div>  
    );
  }
}

export default Map;