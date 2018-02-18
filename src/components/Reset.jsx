import React, {Component} from 'react';
import { Popover, OverlayTrigger, Button, InputGroup } from 'react-bootstrap';
import { inject, observer } from "mobx-react";
import { withRouter } from 'react-router-dom';

import HistoryUtil from '../lib/HistoryUtil';

@inject('atlasStore') @observer
class Reset extends Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
  }

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
      <Popover id="popover-trigger-hover-focus" title={ INFO_TITLE }>
        <strong>Tips:</strong> <br />
        <ul>
          <li>Reset all Atlas properties to default values.</li>
        </ul>
      </Popover>
    );
    return(
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
        <Button className="resetSize" onClick={this.reset}>
          <span className="fa fa-refresh" aria-hidden="true"></span>
        </Button>
      </OverlayTrigger>
    )
  }
}

export default withRouter(Reset);