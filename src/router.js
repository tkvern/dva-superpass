import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Kline from './routes/Kline';
import Exchange from './routes/Exchange';
import User from './routes/User';
import Setting from './routes/Setting';
import Order from './routes/Order';
import Balance from './routes/Balance';
import Login from './routes/Login';
import MessageSubscription from './routes/MessageSubscription';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/app/exchange" exact component={Exchange} />
        <Route path="/app/kline" exact component={Kline} />
        <Route path="/app/user" exact component={User} />
        <Route path="/app/setting" exact component={Setting} />
        <Route path="/app/order" exact component={Order} />
        <Route path="/app/balance" exact component={Balance} />
        <Route path="/app/message_subscription" exact component={MessageSubscription} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
