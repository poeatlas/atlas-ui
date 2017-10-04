import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

@inject("AtlasStore") @observer
class AtlasDowngrade extends Component {
  constructor(props) {
    super(props);
    this.activateSeal = this.activateSeal.bind(this);
  }

  activateSeal() {
    const atlasStore = this.props.AtlasStore;
    atlasStore.setDowngrade(!atlasStore.downgradeState);
  }
  render() {
    const downgradeState = this.props.AtlasStore.downgradeState;
    // determine if orb is active
    const mapClass = {
      downgrade: !downgradeState,
      downgradeToggle: downgradeState, 
    }
    
    return(
    <Button onClick={this.activateSeal} active={!!downgradeState}>
      <div className={cx(mapClass)}></div>
    </Button>
    );
  }
}
export default AtlasDowngrade;