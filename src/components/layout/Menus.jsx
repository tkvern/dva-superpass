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

  componentWillUpdate() {
    // console.log(this.state);
  }

  handleSelectedTabSwitch(key) {
    if (key === this.state.selectedTab) {
      return;
    }
    this.props.dispatch(routerRedux.push(key))
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
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="交易"
          key="exchange"
          dot
          selected={this.state.selectedTab === 'exchange'}
          onPress={() => {
            this.handleSelectedTabSwitch('exchange');
          }}
        />
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
            }}
            />
          }
          title="行情"
          key="kline"
          badge={'new'}
          selected={this.state.selectedTab === 'kline'}
          onPress={() => {
            this.handleSelectedTabSwitch('kline');
          }}
        />
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg' }}
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
