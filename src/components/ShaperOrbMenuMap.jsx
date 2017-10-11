import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

class ShaperOrbMenuMap extends Component {

  render() {
    const {mapStore} = this.props;

    const mapImageStyle = {
      backgroundImage: `url(./${mapStore.iconPath})`,
      position: "aboslute",
    };
    return(
      <div className="map" style={mapImageStyle}>

      </div>
    );
  }
}

export default ShaperOrbMenuMap;