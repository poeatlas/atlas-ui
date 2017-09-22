import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MapStore from './stores/MapStore';
import { Provider  } from 'mobx-react';

it('renders without crashing', () => {
  const stores = {
    MapStore,
  }
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider {...stores}>
      <App />
    </Provider>, div);
});
