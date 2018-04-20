import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import { NoticeBar } from 'antd-mobile';
import ExchangePanel from '../components/exchange/ExchangePanel';
import style from './Exchange.less';

function Exchange() {
  return (
    <MainLayout>
      <div className={style.flexContainer}>

        <NoticeBar className="test" mode="closable" marqueeProps={{ loop: true }} action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
          Tip:交易有盈亏，入场需谨慎
        </NoticeBar>
        <div className={style.subTitle}>交易-BTC</div>
        <ExchangePanel />
      </div>
    </MainLayout>
  );
}

export default connect()(Exchange);
