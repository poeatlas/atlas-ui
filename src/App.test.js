import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AtlasStore from './stores/AtlasStore';
import { Provider  } from 'mobx-react';
import atlas from './resources/atlas.json';
import MapStore from './stores/MapStore';

it('renders without crashing', () => {
  const maps = [];

  for (var i = 0; i < atlas.length; i++) {
    const currMap = atlas[i];
    const mapStore = new MapStore( currMap );

    maps.push(mapStore);
  }
  
  const stores = {
    AtlasStore,
  }
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider {...stores}>
      <App mapStore={maps}/>
    </Provider>, div);
});
