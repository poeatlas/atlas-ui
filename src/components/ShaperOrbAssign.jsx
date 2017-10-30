import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import './ShaperOrbAssign.css';
import ShaperOrbAssignBody from "./ShaperOrbAssignBody";

@inject("ModalStore", "atlasStore") @observer
class ShaperOrbAssign extends Component {
  constructor(props) {
    super(props);
    this.setModalContent = this.setModalContent.bind(this);
  }

  setModalContent() {
    const {ModalStore} = this.props;

    ModalStore.setModalValues({
      title: "Assign Shaper Orbs (Tier 7-10 Maps)",
      shown: !ModalStore.shown,
      body: <ShaperOrbAssignBody />,
    })
  }

  render() {
    const {ModalStore} = this.props;
    return (
      <Button onClick={this.setModalContent} active={ModalStore.shown}>
        <div className="circle borderDottedBlue barAssign"></div>
      </Button>
    )
  }
}

export default ShaperOrbAssign;