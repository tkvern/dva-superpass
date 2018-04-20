import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Kline from './routes/Kline';
import Exchange from './routes/Exchange';
import User from './routes/User';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Exchange} />
        <Route path="/exchange" exact component={Exchange} />
        <Route path="/kline" exact component={Kline} />
        <Route path="/user" exact component={User} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
