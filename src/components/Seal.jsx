import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("AtlasStore") @observer
class Seal extends Component {
  constructor(props) {
    super(props);
    this.activateSeal = this.activateSeal.bind(this);
  }

  activateSeal() {
    const atlasStore = this.props.AtlasStore;
    atlasStore.setSeal(!atlasStore.sealState);
  }

  render() {
    const sealState = this.props.AtlasStore.sealState;

    // determine if orb is active
    const mapClass = {
      buttonImageSize: true,
      seal: true,
      toggle: sealState, 
    }
    
    return (
      <Button onClick={this.activateSeal} active={!!sealState}>
        <div className={cx(mapClass)}></div>
      </Button>
    );
  }
}
export default Seal;