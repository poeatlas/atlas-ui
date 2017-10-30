import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider  } from 'mobx-react';
import atlas from './resources/atlas.json';
import MapStore from './stores/MapStore';
import AtlasStore from './stores/AtlasStore';
import ModalStore from './stores/ModalStore'

it('renders without crashing', () => {
  // array of mapStores
  var maps = atlas.map((map) => { return new MapStore( map ); }); 
  const atlasStore = new AtlasStore(maps);
  
  const stores = {
    atlasStore,
    ModalStore,
  };
  
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider {...stores}>
      <App mapStore={maps}/>
    </Provider>, div);
});
