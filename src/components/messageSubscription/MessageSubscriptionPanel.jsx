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
      list: this.props.list,
      refreshing: false,
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      list: nextProps.list,
    });
  }

  render() {
    const SwipeList = [];
    const modelDlg = (is_open, id) => {
      if (is_open) {
        return [
          {
            text: '关闭',
            onPress: () => this.props.handleEditOpen({
              id: id,
              is_open: 0
            }),
            style: { backgroundColor: '#ddd', color: 'white', width: '68px' },
          },
          {
            text: '删除',
            onPress: () => this.props.handleDestory({
              id: id
            }),
            style: { backgroundColor: '#e14d4e', color: 'white', width: '68px' },
          },
        ];
      } else {
        return [
          {
            text: '开启',
            onPress: () => this.props.handleEditOpen({
              id: id,
              is_open: 1
            }),
            style: { backgroundColor: '#3fc295', color: 'white', width: '68px' },
          },
          {
            text: '删除',
            onPress: () => this.props.handleDestory({
              id: id
            }),
            style: { backgroundColor: '#e14d4e', color: 'white', width: '68px' },
          },
        ];
      }
    }
    this.state.list.forEach(item => {
      return SwipeList.push(
        <SwipeAction
          key={item.id}
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={modelDlg(item.is_open, item.id)}
        >
          <Item
            extra={
              item.is_open ? <div className='green'>已开启</div> : <div>已关闭</div>
            }
            multipleLine
            arrow="horizontal"
            onClick={() => this.props.showEdit(item)}
          >{item.currency.toUpperCase()}<Brief>频率: {item.reminding_time}分钟</Brief>
          </Item>
        </SwipeAction>
      );
    });
    return (
      <div className={style.content}>
        <div className="am-list-header">
          <span style={{ fontSize: '13px' }}>Tip:左滑列表查看菜单</span>
        </div>
        <List>
          {SwipeList}
        </List>
        <WhiteSpace size="md" />
        <div className="am-list-header">
          <div className={style.itemTip}>
            <label title="tip">可以向机器人发送开始/暂停指令</label><br />
            <label title="tip">普通用户最多可以创建5条订阅信息</label>
          </div>
        </div>
        <WhiteSpace size="md" />
        <Button onClick={() => {
          this.props.dispatch(routerRedux.push('/app/message_subscription/create'));
        }}><i className="iconfont" style={{
          color: 'rgb(51, 163, 244)',
          fontSize: '17px'
        }}>&#xe600;</i>  添加币种</Button>
        <WhiteSpace size="xl" />
      </div>
    );
  }
}


export default connect()(MessageSubscriptionPanel);
