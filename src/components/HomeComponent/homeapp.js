import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FrontOfficeApp from '../FrontOfficeComponent/frontofficeapp';

import AdminApp from '../AdminComponent/adminapp';

import HomePage from './home';
import Login from './login';


function HomeApp() {
  return (
    <div className="App">
      <Router>          
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={AdminApp}/>
          <Route path="/frontoffice" component={FrontOfficeApp}/>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default HomeApp;
