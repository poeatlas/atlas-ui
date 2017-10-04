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

  // changeCursor() {
  //   const body = document.getElementsByTagName("body")[0];
  //   console.log(body);
  //   if ( !this.state.sealOn ) {
  //     body.classList.add('sealCursor');
  //     this.setState({
  //       sealOn: true,
  //     });
  //   } else {
  //     body.classList.remove('sealCursor');
  //     this.setState({
  //       sealOn: false,
  //     });
  //   }
  // }

  render() {
    const sealState = this.props.AtlasStore.sealState;
    // determine if orb is active
    const mapClass = {
      seal: !sealState,
      sealToggle: sealState, 
    }
    
    return (
      <Button onClick={this.activateSeal} active={!!sealState}>
        <div className={cx(mapClass)}></div>
      </Button>
    );
  }
}
export default Seal;