import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {inject, observer} from 'mobx-react';

@inject("ModalStore", "atlasStore") @observer
class ModalDialogue extends Component {
  constructor(props) {
    super(props);
    this.props.ModalStore.callback = this.props.ModalStore.callback.bind(this);
  }

  render() {
    const modalStore = this.props.ModalStore;
    let button = null;
    if (modalStore.extraButton) {
      button = <div>
        <Button onClick={() => {modalStore.shown = false}}>{modalStore.cancelText}</Button>
        <Button bsStyle="primary" onClick={modalStore.callback} >{modalStore.confirmText}</Button>
      </div>
    } else {
      button = <Button bsStyle="primary" onClick={() => {modalStore.shown = false}}>{modalStore.confirmText}</Button>
    }
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
          {button}
        </Modal.Footer>

      </Modal>
    )
  }
}
export default ModalDialogue;