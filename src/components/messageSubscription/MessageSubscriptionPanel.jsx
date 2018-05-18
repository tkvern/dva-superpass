import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { List, SwipeAction } from 'antd-mobile';
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
            >BTC<Brief>5分钟</Brief>
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
            >ETH<Brief>5分钟</Brief>
            </Item>
          </SwipeAction>
        </List>
      </div>
    );
  }
}


export default connect()(MessageSubscriptionPanel);
