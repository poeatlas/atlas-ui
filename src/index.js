import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MapStore from './stores/MapStore';
import registerServiceWorker from './registerServiceWorker';
import { Provider  } from 'mobx-react';

const stores = {
  MapStore,
}

ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
