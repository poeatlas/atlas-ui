import React, { Component } from 'react';
import { MAP_MULTIPLIER, MAP_OFFSET } from '../const';

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
      left: `${x * MAP_MULTIPLIER - 39 * 8/7}px`,
      top: `${y * MAP_MULTIPLIER + 39 * 18/5}px`,
      backgroundColor: "transparent"
    }
    return (
      <div type="text" style = {textStyle}>94 / 126</div>
    );
  }
}
export default BonusCount;