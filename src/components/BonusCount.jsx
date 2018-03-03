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
      fontSize: "14px",
      color: "white",
      width: "78px",
      height: "14px",
      textAlign: "center",
      lineHeight: "1.1",
      left: `${x * MAP_MULTIPLIER - 39 }px`,
      top: `${y * MAP_MULTIPLIER + 39 * 15/6}px`,
      backgroundColor: "transparent"
    }
    return (
      <div type="text" style = {textStyle}>{this.props.atlasStore.bonusCount} / 157</div>
    );
  }
}
export default BonusCount;