import React, { Component } from 'react';
import { connect } from 'dva';
import { NoticeBar } from 'antd-mobile';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class KlinePanel extends Component {
  render() {
    return (
      <div style={{ height: '100%', minHeight: '480px' }}>
        <NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
          Tip:横屏显示更多信息
        </NoticeBar>
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          interval="60"
          timezone="Asia/Shanghai"
          theme={Themes.Light}
          locale="zh_CN"
          toolbar_bg="#f1f3f6"
          enable_publishing={false}
          hide_side_toolbar={true}
          allow_symbol_change={true}
          save_image={true}
          details={true}
          calendar={false}
          autosize={true}
          news={[
            "headlines"
          ]}
          studies={[
            "MASimple@tv-basicstudies",
            "Volume@tv-basicstudies"
          ]}
        />
      </div>
    );
  }
}

export default connect()(KlinePanel);
