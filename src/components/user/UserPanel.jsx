import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace } from 'antd-mobile';
import style from './UserPanel.less';
// import Numeral from 'numeral';

const Item = List.Item;
const Brief = Item.Brief;

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
      user: this.props.user
    }
  }

  render() {
    return (
      <div className={style.content}>
        <Item
          className={style.userinfo}
          arrow="empty"
          thumb={
            <img
              className={style.avatar}
              alt="avatar"
              src={`http://dummyimage.com/150x150/0a2140/FFFFFF.jpg&text=${this.state.user.username.split('')[0].toUpperCase()}`}
              style={{ width: '60px', height: '60px' }} />
          }
          onClick={() => { }}
        >
          {this.state.user.username}<Brief>{this.state.user.email}</Brief>
        </Item>
        <WhiteSpace size="md" />
        <List>
          {/*<Item
            className={style.balance}
            extra={Numeral(this.state.user.score_value).format('0,0.00') + ""}
            thumb={
              <i className="iconfont" style={{
                color: 'rgb(51, 163, 244)'
              }}>&#xe618;</i>
            }
            arrow="horizontal"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/app/balance'))
            }}
          >积分</Item>*/}
          {/*<Item
            thumb={
              <i className="iconfont" style={{
                color: '#f8aa03'
              }}>&#xe604;</i>
            }
            arrow="horizontal"
            onClick={() => {
              Toast.info("正在施工！", 1)
              // this.props.dispatch(routerRedux.push('order'))
            }}
          >订单</Item>*/}
          <Item
            thumb={
              <i className="iconfont" style={{
                color: '#37ab91'
              }}>&#xe627;</i>
            }
            arrow="horizontal"
            onClick={() => {
              this.props.dispatch(routerRedux.push('/app/message_subscription'))
            }}
          >订阅</Item>
          {/*<Item
            thumb={
              <i className="iconfont" style={{
                color: '#e8541e'
              }}>&#xe797;</i>
            }
            arrow="horizontal"
            onClick={() => {
              Toast.info("正在施工！", 1)
              // this.props.dispatch(routerRedux.push('order'))
            }}
          >兑换</Item>*/}
        </List>
        <WhiteSpace size="md" />
        {/*<List>
          <Item
            thumb={
              <i className="iconfont" style={{
                color: 'rgb(51, 163, 244)'
              }}>&#xe601;</i>
            }
            arrow="horizontal"
            onClick={() => { Toast.info("正在施工！", 1) }}
          >邀请</Item>
          <Item
            thumb={
              <i className="iconfont" style={{
                color: 'rgb(51, 163, 244)'
              }}>&#xe603;</i>
            }
            arrow="horizontal"
            onClick={() => { Toast.info("正在施工！", 1) }}
          >关于</Item>
          </List>*/}
      </div>);
  }
}


export default connect()(UserPanel);
