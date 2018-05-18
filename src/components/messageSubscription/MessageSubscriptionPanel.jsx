import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { List, SwipeAction, WhiteSpace, Button } from 'antd-mobile';
// import { delCookie } from '../../utils/helper';
import style from './MessageSubscriptionPanel.less';
// import { getScoresType } from '../../utils/helper';

const Item = List.Item;
const Brief = Item.Brief;

// const data = [
//   {
//     "id": 4,
//     "is_settlement": "2",
//     "type": "1",
//     "value": 10000,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:18:23",
//     "updated_at": "2018-05-08 16:18:27"
//   },
//   {
//     "id": 5,
//     "is_settlement": "2",
//     "type": "4",
//     "value": 10,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:43:14",
//     "updated_at": "2018-05-08 16:43:14"
//   },
//   {
//     "id": 6,
//     "is_settlement": "2",
//     "type": "2",
//     "value": 10000,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:18:23",
//     "updated_at": "2018-05-08 16:18:27"
//   },
//   {
//     "id": 7,
//     "is_settlement": "2",
//     "type": "3",
//     "value": 10,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:43:14",
//     "updated_at": "2018-05-08 16:43:14"
//   },
//   {
//     "id": 8,
//     "is_settlement": "2",
//     "type": "5",
//     "value": 10000,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:18:23",
//     "updated_at": "2018-05-08 16:18:27"
//   },
//   {
//     "id": 9,
//     "is_settlement": "2",
//     "type": "4",
//     "value": 10,
//     "user_id": 4,
//     "created_at": "2018-05-08 16:43:14",
//     "updated_at": "2018-05-08 16:43:14"
//   }
// ];

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
          <h4>订阅状态:<span className={`${style.breatheBtn} ${'green'}`}>推送中...</span></h4>
          <span>Tip:左滑列表查看菜单</span>
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
        <div className={style.itemTip}>
          <label title="tip">可以向机器人发送开始/暂停指令</label>
        </div>
        <WhiteSpace size="md" />
        <Button>开始/暂停(全部)</Button>
        <WhiteSpace size="md" />
        <Button><i className="iconfont" style={{
          color: 'rgb(51, 163, 244)',
          fontSize: '17px'
        }}>&#xe600;</i>  添加币种</Button>
      </div>
    );
  }
}


export default connect()(MessageSubscriptionPanel);
