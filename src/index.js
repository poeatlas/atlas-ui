import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AtlasStore from './stores/AtlasStore';
import ModalStore from './stores/ModalStore'
import registerServiceWorker from './registerServiceWorker';
import { Provider  } from 'mobx-react';
import atlas from './resources/atlas.json';
import MapStore from './stores/MapStore';

// array of mapStores
var maps = atlas.map((map) => { return new MapStore( map ); }); 
const atlasStore = new AtlasStore(maps);

const stores = {
  atlasStore,
  ModalStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <App mapStore={maps}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
