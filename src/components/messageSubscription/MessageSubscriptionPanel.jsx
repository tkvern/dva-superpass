import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, SwipeAction, WhiteSpace, Button } from 'antd-mobile';
import style from './MessageSubscriptionPanel.less';

const Item = List.Item;
const Brief = Item.Brief;
class MessageSubscriptionPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }

  render() {
    return (
      <div className={style.content}>
        <div className="am-list-header">
          <h4>订阅状态: <span className={`${style.breatheBtn} ${'green'}`}>推送中...</span></h4>
          <span style={{ fontSize: '13px' }}>Tip:左滑列表查看菜单</span>
        </div>
        <List>
          <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
              {
                text: '关闭',
                onPress: () => console.log('cancel'),
                style: { backgroundColor: '#ddd', color: 'white', width: '68px' },
              },
              {
                text: '删除',
                onPress: () => console.log('delete'),
                style: { backgroundColor: '#e14d4e', color: 'white', width: '68px' },
              },
            ]}
          >
            <Item
              extra={
                <div className='green'>已开启</div>
              }
              multipleLine
              arrow="horizontal"
              onClick={() => console.log('List.Item clicked!')}
            >BTC<Brief>频率: 5分钟</Brief>
            </Item>
          </SwipeAction>
          <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
              {
                text: '开启',
                onPress: () => console.log('cancel'),
                style: { backgroundColor: '#3fc295', color: 'white', width: '68px' },
              },
              {
                text: '删除',
                onPress: () => console.log('delete'),
                style: { backgroundColor: '#e14d4e', color: 'white', width: '68px' },
              },
            ]}
          >
            <Item
              extra="已关闭"
              multipleLine
              arrow="horizontal"
              onClick={() => console.log('List.Item clicked!')}
            >ETH<Brief>频率: 60分钟</Brief>
            </Item>
          </SwipeAction>
        </List>
        <WhiteSpace size="md" />
        <div className="am-list-header">
          <div className={style.itemTip}>
            <label title="tip">可以向机器人发送开始/暂停指令</label>
          </div>
        </div>
        <WhiteSpace size="md" />
        <Button onClick={() => {
          this.props.dispatch(routerRedux.push('/app/message_subscription/create'));
        }}><i className="iconfont" style={{
          color: 'rgb(51, 163, 244)',
          fontSize: '17px'
        }}>&#xe600;</i>  添加币种</Button>
      </div>
    );
  }
}


export default connect()(MessageSubscriptionPanel);
