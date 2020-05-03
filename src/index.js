import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Booking from './containers/Booking'
import CarDetails from './containers/CarDetails'

const routing = (
  <Router>
    <div>
      <Route exact path="/car-web/" component={App} />
      <Route path="/car-web/book-now" component={Booking} />
      <Route path="/car-web/car-details" component={CarDetails} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
