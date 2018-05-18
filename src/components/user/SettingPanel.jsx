import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, WhiteSpace, List } from 'antd-mobile';
import { delCookie } from '../../utils/helper';
import style from './SettingPanel.less';

const Alert = Modal.alert;
const Item = List.Item;
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
    const showClear = () => {
      Alert('提示', '确认清空当前缓存吗?', [
        { text: '取消', onPress: () => { } },
        {
          text: '确认', onPress: () => {
            localStorage.removeItem('ticker');
            localStorage.removeItem('currentOrders');
            localStorage.removeItem('rates');
          }
        },
      ]);
    };
    return (
      <div className={style.content}>
        <List>
          <Item extra={
            <img className={style.avatar} alt="avatar" src="https://avatars0.githubusercontent.com/u/10667077?s=460&v=4" style={{ width: '60px', height: '60px' }} />
          }>头像</Item>
          <Item extra="tkvern">账户</Item>
          <Item extra="vern">昵称</Item>
          <Item extra="tkvern@qq.com">邮箱</Item>
          <Item extra="未绑定">手机号</Item>
          <Item extra="1,549,136">积分</Item>
          <Item extra="251,845">实力</Item>
        </List>
        <WhiteSpace size="md" />
        <Button onClick={showClear}>清空缓存</Button>
        <WhiteSpace size="md" />
        <Button onClick={showAlert}>退出登录</Button>
      </div>
    );
  }
}


export default connect()(SettingPanel);
