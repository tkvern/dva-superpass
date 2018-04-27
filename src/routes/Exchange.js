import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import { NoticeBar } from 'antd-mobile';
import ExchangePanel from '../components/exchange/ExchangePanel';
import style from './Exchange.less';

function Exchange({ auth, exchange }) {
  const { user } = auth;
  const {
    ticker_price,
    ticker_percent,
    ticker_change,
    ticker_direction,
    ticker_24direction,
    cnyusd,
    currentOrders
  } = exchange;
  const exchangePanelProps = {
    user: user,
    ticker_price: ticker_price,
    ticker_percent: ticker_percent,
    ticker_change: ticker_change,
    ticker_direction: ticker_direction,
    ticker_24direction: ticker_24direction,
    cnyusd: cnyusd,
    currentOrders: currentOrders
  }
  return (
    <MainLayout>
      <div className={style.flexContainer}>

        <NoticeBar className="test" mode="closable" marqueeProps={{ loop: true }} action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
          Tip:交易有盈亏，入场需谨慎
        </NoticeBar>
        <ExchangePanel {...exchangePanelProps} />
      </div>
    </MainLayout>
  );
}
function mapStateToProps({ auth, exchange }) {
  return { auth, exchange };
}
export default connect(mapStateToProps)(Exchange);
