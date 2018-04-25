import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import MainLayout from '../components/layout/MainLayout';
import UserPanel from '../components/user/UserPanel';
import style from './User.less';

function User({ dispatch }) {
  return (
    <MainLayout>
      <NavBar
        className={style.navbarFixed}
        mode="dark"
        leftContent=""
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={
          <label onClick={() => {
            dispatch(routerRedux.push('setting'));
          }}>设置</label>
        }
      ></NavBar>
      <UserPanel />
    </MainLayout>
  );
}

export default connect()(User);