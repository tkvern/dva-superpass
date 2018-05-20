import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import MessageSubscriptionCreate from '../../components/messageSubscription/MessageSubscriptionCreate';
import style from './Create.less';

function Create({ dispatch }) {
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.push('/app/message_subscription'))
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>添加币种</label>]
        }
      />
      <MessageSubscriptionCreate />
    </SingleLayout>
  )
}

export default connect()(Create);
