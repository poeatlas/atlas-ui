import React, {Component} from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
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
      confirmText: "Done",
      extraButton: false,
    })
  }

  render() {
    const {ModalStore} = this.props;
    const INFO_TITLE="Shaper Orb Assignment";
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Assign shaper orb source for map tiers with more than one shaper orb.</li>
        </ul>
      </Popover>
    );
    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
        <Button onClick={this.setModalContent} active={ModalStore.shown}>
          <div className="circle borderDottedBlue barAssign"></div>
        </Button>
      </OverlayTrigger>
    )
  }
}

export default ShaperOrbAssign;