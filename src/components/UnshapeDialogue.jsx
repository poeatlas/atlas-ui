import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {inject, observer} from 'mobx-react';

@inject("ModalStore", "atlasStore") @observer
class UnshapeDialogue extends Component {
  constructor(props) {
    super(props);
    this.props.ModalStore.callback = this.props.ModalStore.callback.bind(this);
  }

  render() {
    const modalStore = this.props.ModalStore;
    console.log("body is " + modalStore.body);
    return (
      <Modal show={modalStore.shown}>
        <Modal.Header>
          <Modal.Title>
            {modalStore.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalStore.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {modalStore.shown = false}}>Cancel</Button>
          <Button bsStyle="primary" onClick={modalStore.callback}>Okay</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}
export default UnshapeDialogue;