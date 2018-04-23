import React from 'react';
import { connect } from 'dva';
import { NavBar } from 'antd-mobile';
import MainLayout from '../components/layout/MainLayout';
import UserPanel from '../components/user/UserPanel';
import style from './User.less';

function User() {
  return (
    <MainLayout>
      <NavBar
        className={style.navbarFixed}
        mode="dark"
        leftContent=""
        onLeftClick={() => console.log('onLeftClick')}
        rightContent="设置"
      ></NavBar>
      <UserPanel />
    </MainLayout>
  );
}

export default connect()(User);
