import React, { Component } from 'react';
import Provider from './store/Provider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import Books from './pages/Books';
import Authors from './pages/Authors/Authors';
import Management from './pages/Management/Management';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import Login from './pages/Login/Login';
import PrivateRoute from './utility/components/PrivateRoute';
import './App.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <Provider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Books} />
              <Route path="/author" component={Authors} />
              <PrivateRoute path="/management" component={Management} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Layout>
        </Provider>
      </Router>
    );
  }
}

export default App;
