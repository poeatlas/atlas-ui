import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { inject, observer } from "mobx-react";
import { InputGroup, Popover, OverlayTrigger } from 'react-bootstrap';
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
    return(
      <Button onClick={this.reset}>
        <span className="fa fa-refresh" aria-hidden="true"></span>
      </Button>
    )
  }
}

export default withRouter(Reset);