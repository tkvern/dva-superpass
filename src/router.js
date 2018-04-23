import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Kline from './routes/Kline';
import Exchange from './routes/Exchange';
import User from './routes/User';
import Setting from './routes/Setting';
import Order from './routes/Order';
import Balance from './routes/Balance';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Exchange} />
        <Route path="/exchange" exact component={Exchange} />
        <Route path="/kline" exact component={Kline} />
        <Route path="/user" exact component={User} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/order" exact component={Order} />
        <Route path="/balance" exact component={Balance} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
