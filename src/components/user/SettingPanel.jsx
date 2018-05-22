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
      user: this.props.user
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    // this.setState({
    //   [key]: true,
    // });
  }

  render() {
    const showAlert = () => {
      Alert('提示', '确认退出当前账号吗?', [
        { text: '取消', onPress: () => { } },
        {
          text: '确认', onPress: () => {
            delCookie('access_token');
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
            localStorage.removeItem('message_subscriptions');
          }
        },
      ]);
    };
    return (
      <div className={style.content}>
        <List>
          <Item extra={
            <img
              className={style.avatar}
              alt="avatar"
              src={`http://dummyimage.com/150x150/0a2140/FFFFFF.jpg&text=${this.state.user.username.split('')[0].toUpperCase()}`}
              style={{ width: '60px', height: '60px' }}
            />
          }>头像</Item>
          <Item extra={this.state.user.username}>账户</Item>
          {/*<Item extra={this.state.user.nickname}>昵称</Item>*/}
          <Item extra={this.state.user.email}>邮箱</Item>
          {/*<Item extra={this.state.user.phone_number}>手机号</Item>*/}
          {/*<Item extra={`${this.state.user.wechat_info['Province']} ${this.state.user.wechat_info['City']}`}>地区</Item>*/}
          {/*<Item extra={this.state.user.wechat_info['Sex'] === 1 ? '男' : '女'}>性别</Item>*/}
          <Item extra={this.state.user.score_value}>积分</Item>
          <Item extra={this.state.user.profit_score_value}>实力</Item>
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
