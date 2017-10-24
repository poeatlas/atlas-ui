import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("atlasStore") @observer
class Sextant extends Component {
  constructor(props) {
    super(props);
    this.activateSextant = this.activateSextant.bind(this);
  }

  activateSextant() {
    const atlasStore = this.props.atlasStore;
    atlasStore.setSextant(!atlasStore.sextantState);
  }

  render() {
    const sextantState = this.props.atlasStore.sextantState;
    
    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      sextant: true,
      toggle: sextantState, 
    }
    return (
      <Button onClick={this.activateSextant} active={!!sextantState}>
        <div className={cx(mapClass)}></div>
      </Button>
    );
  }
}
export default Sextant;