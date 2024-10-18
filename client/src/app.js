/**
 *
 * app.js
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container } from 'react-bootstrap';
import store, { history } from './store';
import { SocketProvider } from './contexts/Socket';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';
import setToken from './utils/token';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/style.scss'; //application styles
import Carousel from 'react-bootstrap/Carousel';

/*import banner2 from '../src/images/banners/banner-2.jpg';
import banner3 from '../src/images/banners/banner-3.jpg';
import banner4 from '../src/images/banners/banner-4.jpg';
import banner5 from '../src/images/banners/banner-5.jpg';
import banner6 from '../src/images/banners/banner-6.jpg'; */



// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
 

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

// Authentication
const token = localStorage.getItem('token');

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

const app = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SocketProvider>
        <ScrollToTop>  
            
                <Application />
           
                            
        </ScrollToTop>
      </SocketProvider>
    </ConnectedRouter>
  </Provider>
);

export default app;
