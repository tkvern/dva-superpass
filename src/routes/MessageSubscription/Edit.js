import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import MessageSubscriptionEdit from '../../components/messageSubscription/MessageSubscriptionEdit';
import style from './Create.less';

function Edit({ dispatch, messageSubscription }) {
  const { current, currency_detail } = messageSubscription;
  const messageSubscriptionEditProps = {
    onSubmit(data) {
      dispatch({
        type: 'messageSubscription/update',
        payload: data
      })
    },
    current: current,
    currency_detail: currency_detail
  }
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
          <label key="2" style={{ color: "#000" }}>修改币种</label>]
        }
      />
      <MessageSubscriptionEdit {...messageSubscriptionEditProps} />
    </SingleLayout>
  )
}
function mapStateToProps({ messageSubscription }) {
  return { messageSubscription };
}
export default connect(mapStateToProps)(Edit);
