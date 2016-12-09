import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Immutable from 'immutable';

const initialState = Immutable.Map();
const store = configureStore();

// Expose globally
window.React = React;

ReactDOM.render(
  <Provider store={store}>
      <Router
          children={routes}
          history={browserHistory} />
  </Provider>,
  document.getElementById('app'));

export default store;
