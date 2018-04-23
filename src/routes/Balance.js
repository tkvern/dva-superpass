import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../components/layout/SingleLayout';
import style from './Blance.less';

function Blance({ dispatch }) {
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
          <label key="2" style={{ color: "#000" }}>余额</label>]
        }
      />
      <div className={style.content}>
        <h1>这里是余额</h1>
      </div>
    </SingleLayout>
  )
}

export default connect()(Blance);
