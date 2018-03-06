import React, {Component} from 'react';
import { OverlayTrigger, Button } from 'react-bootstrap';
import { inject, observer } from "mobx-react";
import { withRouter } from 'react-router-dom';

import HistoryUtil from '../lib/HistoryUtil';

@inject('atlasStore') @observer
class Reset extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

  // reset map states and recalculate history
  reset() {
    const atlasStore = this.props.atlasStore;
    atlasStore.resetMaps();

    // store history
    const historyUtil = new HistoryUtil(atlasStore, this.props.history);
    historyUtil.recalculateHistory();
  }

  render() {
    const INFO_TITLE="Reset Atlas";
    const popoverHoverFocus = (
      <div className="customPopover info">
        <div className="customPopoverTitle infoTitle">{INFO_TITLE}</div>
        <div className="customPopover infoContent">
          <strong>Tips:</strong> <br />
          <ul>
            <li>Reset all Atlas properties to default values.</li>
          </ul>
        </div>
      </div>
    );

    return(
      <Button className="resetSize" onClick={this.reset}>
        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" container={this} overlay={popoverHoverFocus}>
          <span className="fa fa-refresh" aria-hidden="true"></span>
        </OverlayTrigger>
      </Button>
    )
  }
}

export default withRouter(Reset);