import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, WhiteSpace } from 'antd-mobile';
import { delCookie } from '../../utils/helper';
import style from './SettingPanel.less';

const Alert = Modal.alert;
class SettingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  render() {
    const showAlert = () => {
      Alert('提示', '确认退出当前账号吗?', [
        { text: '取消', onPress: () => { } },
        {
          text: '确认', onPress: () => {
            delCookie('token');
            localStorage.clear();
            this.props.dispatch(routerRedux.push('/login'));
          }
        },
      ]);
    };
    return (
      <div className={style.content}>
        <WhiteSpace size="md" />
        <Button onClick={showAlert}>退出登录</Button>
      </div>
    );
  }
}


export default connect()(SettingPanel);
