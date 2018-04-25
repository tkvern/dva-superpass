import React from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { NavBar } from 'antd-mobile';
import SingleLayout from '../components/layout/SingleLayout';
import LoginPanel from '../components/login/LoginPanel';
import style from './Login.less';

function Login({ dispatch, auth }) {
  const loginPanelProps = {
    onSubmit(data) {
      dispatch({
        type: 'auth/login',
        payload: data
      })
    }
  }
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
      >登录</NavBar>
      <div className={style.content}>
        <LoginPanel
          {...loginPanelProps}
        />
      </div>
    </SingleLayout>
  )
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Login);
