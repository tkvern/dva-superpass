import React from 'react';
import { connect } from 'dva';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import MainLayout from '../components/layout/MainLayout';
import KlinePanel from '../components/kline/KlinePanel';

function Kline() {
  return (
    <MainLayout>
      <div style={{ height: '100%', minHeight: '480px' }}>
        <KlinePanel />
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          interval="60"
          timezone="Asia/Shanghai"
          theme={Themes.Light}
          locale="zh_CN"
          toolbar_bg="#f1f3f6"
          enable_publishing={false}
          hide_side_toolbar={true}
          allow_symbol_change={false}
          save_image={false}
          details={true}
          calendar={false}
          autosize={true}
          news={[
            "headlines"
          ]}
        />
      </div>
    </MainLayout>
  );
}

export default connect()(Kline);
