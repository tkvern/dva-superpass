import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import MainLayout from '../components/layout/MainLayout';
import UserPanel from '../components/user/UserPanel';
import style from './User.less';

function User({ dispatch, auth }) {
  const { user } = auth;
  const userPanelProps = {
    user: user
  }
  return (
    <MainLayout>
      <NavBar
        className={style.navbarFixed}
        mode="dark"
        leftContent="我的"
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={
          <label onClick={() => {
            dispatch(routerRedux.push('/app/setting'));
          }}>设置</label>
        }
      ></NavBar>
      <UserPanel {...userPanelProps} />
    </MainLayout>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(User);
