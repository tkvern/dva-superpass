import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import MessageSubscriptionPanel from '../../components/messageSubscription/MessageSubscriptionPanel';
import style from './Index.less';

function Index({ dispatch, messageSubscription }) {
  const { list } = messageSubscription;
  const messageSubscriptionPanelProps = {
    list: list,
    handleEditOpen(data) {
      dispatch({
        type: 'messageSubscription/editOpen',
        payload: data
      })
    },
    handleDestory(data) {
      dispatch({
        type: 'messageSubscription/destory',
        payload: data
      })
    },
    showEdit(data) {
      dispatch(routerRedux.push(`/app/message_subscription/${data.id}/edit`));
      dispatch({
        type: 'messageSubscription/showEdit',
        payload: {
          current: data
        }
      })
    }
  }
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.push('/app/user'))
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>订阅</label>]
        }
      />
      <MessageSubscriptionPanel {...messageSubscriptionPanelProps} />
    </SingleLayout>
  )
}

function mapStateToProps({ messageSubscription }) {
  return { messageSubscription };
}
export default connect(mapStateToProps)(Index);
