import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mapStore from './stores/MapStore.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App store={ mapStore }/>, document.getElementById('root'));
registerServiceWorker();
