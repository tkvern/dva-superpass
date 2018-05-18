import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../components/layout/SingleLayout';
import MessageSubscriptionPanel from '../components/messageSubscription/MessageSubscriptionPanel';
import style from './MessageSubscription.less';

function MessageSubscription({ dispatch }) {
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.push('user'))
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>订阅</label>]
        }
      />
      <MessageSubscriptionPanel />
    </SingleLayout>
  )
}

export default connect()(MessageSubscription);
