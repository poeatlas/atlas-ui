import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AtlasStore from './stores/AtlasStore';
import registerServiceWorker from './registerServiceWorker';
import { Provider  } from 'mobx-react';
import atlas from './resources/atlas.json';
import MapStore from './stores/MapStore';

const maps = [];

for (var i = 0; i < atlas.length; i++) {
  const currMap = atlas[i];
  const mapStore = new MapStore( currMap );

  maps.push(mapStore);
}

const stores = {
  AtlasStore,
}

ReactDOM.render(
  <Provider {...stores}>
    <App mapStore={maps}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
