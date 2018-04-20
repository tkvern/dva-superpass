import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar } from 'antd-mobile';
import './Menus.less';

const Menus = ({ dispatch, history, selectedTab, hidden }) => {

  function handleSelectedTabSwitch(key) {
    if (key === selectedTab) {
      return;
    }
    dispatch(routerRedux.push(key))
    dispatch({
      type: 'menus/selectedTabSwitch',
      payload: {
        selectedTab: key,
      }
    })
  }
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={hidden}
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
        selected={selectedTab === 'exchange'}
        onPress={() => {
          handleSelectedTabSwitch('exchange');
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
        selected={selectedTab === 'kline'}
        onPress={() => {
          handleSelectedTabSwitch('kline');
        }}
      />
      <TabBar.Item
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg' }}
        title="我的"
        key="user"
        selected={selectedTab === 'user'}
        onPress={() => {
          handleSelectedTabSwitch('user');
        }}
      />
    </TabBar>
  )
}

export default connect()(Menus);
