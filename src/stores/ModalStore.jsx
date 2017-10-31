import { observable, action } from 'mobx';

const CONFIRM_TEXT = "Okay";
const CANCEL_TEXT = "Cancel";

class ModalStore {
  @observable body;
  @observable title;
  @observable shown = false;
  @observable callback = () => {};
  @observable extraButton = false;
  @observable confirmText = "";
  @observable cancelText = "";

  @action setModalValues({title, body, shown, callback, confirmText, cancelText, extraButton}) {
    this.title = title;
    this.body = body;
    this.shown = shown;
    this.callback = callback;
    this.confirmText = confirmText ? confirmText : CONFIRM_TEXT;
    this.cancelText = cancelText ? cancelText : CANCEL_TEXT;
    this.extraButton = extraButton === undefined ? true : extraButton; 
  }
}

export default new ModalStore();