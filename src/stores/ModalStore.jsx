import { observable, action } from 'mobx';

class ModalStore {
  @observable body;
  @observable title;
  @observable shown = false;
  @observable callback = () => {};

  @action setModalValues({title, body, shown, callback}) {
    this.title = title;
    this.body = body;
    this.shown = shown;
    this.callback = callback;
  }
}

export default new ModalStore();