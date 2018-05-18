import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar } from 'antd-mobile';
import './Menus.less';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.selectedTab,
      hidden: this.props.hidden
    }
  }

  handleSelectedTabSwitch(key) {
    if (key === this.state.selectedTab) {
      return;
    }
    this.props.dispatch(routerRedux.push('/app/' + key))
    this.props.dispatch({
      type: 'menus/selectedTabSwitch',
      payload: {
        selectedTab: key,
      }
    })
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        noRenderContent={true}
      >
        <TabBar.Item
          // icon={
          //   <div style={{
          //     width: '22px',
          //     height: '22px',
          //     background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
          //   }}
          //   />
          // }
          icon={
            <i className="iconfont">&#xe607;</i>
          }
          selectedIcon={
            <i className="iconfont"
            style={{
              color: 'rgb(51, 163, 244)'
            }}>&#xe607;</i>
          }
          title="活动"
          key="exchange"
          dot
          selected={this.state.selectedTab === 'exchange'}
          onPress={() => {
            this.handleSelectedTabSwitch('exchange');
          }}
        />
        <TabBar.Item
          icon={
            <i className="iconfont">&#xe60c;</i>
          }
          selectedIcon={
            <i className="iconfont"
            style={{
              color: 'rgb(51, 163, 244)'
            }}>&#xe60c;</i>
          }
          title="排行"
          key="leaderboard"
          selected={this.state.selectedTab === 'leaderboard'}
          onPress={() => {
            // this.handleSelectedTabSwitch('kline');
          }}
        />
        <TabBar.Item
          icon={
            <i className="iconfont">&#xe63f;</i>
          }
          selectedIcon={
            <i className="iconfont"
            style={{
              color: 'rgb(51, 163, 244)'
            }}>&#xe63f;</i>
          }
          title="行情"
          key="kline"
          dot
          selected={this.state.selectedTab === 'kline'}
          onPress={() => {
            this.handleSelectedTabSwitch('kline');
          }}
        />
        <TabBar.Item
          icon={
            <i className="iconfont">&#xe626;</i>
          }
          selectedIcon={
            <i className="iconfont"
            style={{
              color: 'rgb(51, 163, 244)'
            }}>&#xe626;</i>
          }
          title="我的"
          key="user"
          selected={this.state.selectedTab === 'user'}
          onPress={() => {
            this.handleSelectedTabSwitch('user');
          }}
        />
      </TabBar>
    )
  }
}

export default connect()(Menus);
