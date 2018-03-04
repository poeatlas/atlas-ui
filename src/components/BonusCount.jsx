import React, { Component } from 'react';
import { MAP_MULTIPLIER } from '../const';
import { inject, observer} from 'mobx-react';

@inject('atlasStore') @observer
class BonusCount extends Component {
    
  render() {
    const {x, y} = this.props;
  
    const textStyle = {
      position: "absolute",
      fontFamily: "serif",
      fontSize: "25px",
      color: "white",
      width: "95px",
      height: "25px",
      textAlign: "center",
      lineHeight: "1.1",
      left: `${x * MAP_MULTIPLIER - 47 }px`,
      top: `${y * MAP_MULTIPLIER + 47 * 25/6}px`,
      backgroundColor: "transparent"
    }
    return (
      <div type="text" style = {textStyle}>{this.props.atlasStore.bonusCount} / 157</div>
    );
  }
}
export default BonusCount;