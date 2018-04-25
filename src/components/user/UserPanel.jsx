import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace } from 'antd-mobile';
import style from './UserPanel.less';
import Numeral from 'numeral';

const Item = List.Item;
const Brief = Item.Brief;

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0
    }
  }

  render() {
    return (
      <div className={style.content}>
        <Item
          className={style.userinfo}
          arrow="empty"
          thumb={
            <img className={style.avatar} alt="avatar" src={this.props.user.avatar} style={{ width: '60px', height: '60px' }} />
          }
          onClick={() => { }}
        >
          {this.props.user.name}<Brief>{this.props.user.email}</Brief>
        </Item>
        <WhiteSpace size="md" />
        <List>
          <Item
            className={style.balance}
            extra={Numeral(this.props.user.balance).format('0,0.00') + " CNY"}
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {
              this.props.dispatch(routerRedux.push('balance'))
            }}
          >余额</Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            arrow="horizontal"
            onClick={() => {
              this.props.dispatch(routerRedux.push('order'))
            }}
          >订单</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => { }}
          >邀请</Item>
          <Item
            arrow="horizontal"
            onClick={() => { }}
          >关于</Item>
          {/*<img alt="tst" src="/11524478118_.pic_hd.jpg" width="100%" />*/}
        </List>
      </div>);
  }
}


export default connect()(UserPanel);
