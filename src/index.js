
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';


import './index.css';
// import AdminMain from './components/admin';

import root from './areducers/reducer';
import App from './components/app/app';

const store = createStore(root);

ReactDOM.render(
  <div>
    <Provider store={store} >   
      <BrowserRouter>
        <div>
            <Route path="/" component={App} />
        </div> 
      </BrowserRouter> 
    </Provider> 
  </div>
, document.getElementById('root'));
