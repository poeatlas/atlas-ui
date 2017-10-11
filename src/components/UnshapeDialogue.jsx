import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {inject, observer} from 'mobx-react';

@inject("AtlasStore") @observer
class UnshapeDialogue extends Component {
  constructor(props) {
    super(props);
    this.executeUnshape = this.executeUnshape.bind(this);
  }

  executeUnshape() {
    const { mapStore, mapList } = this.props.mapProps;
    const prevShapedMap = mapList[mapList[mapStore.shapedById].shapedMapId];
    console.log(prevShapedMap);
    prevShapedMap.shaped = false;
    prevShapedMap.shapedById = -1;
    // mapStore.shapedById = -1
    mapStore.showUnshapeModal = false;
  }

  render() {
    const { mapStore } = this.props.mapProps;
    return (
      <Modal show={mapStore.showUnshapeModal}>
        <Modal.Header>
          <Modal.Title>
            Shaping Limit Reached
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Only one map can be shaped for this tier.</p>
          <p>Do you want to unshape the currently shaped map?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button bsStyle="primary" onClick={this.executeUnshape}>Okay</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}
export default UnshapeDialogue;