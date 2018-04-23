import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import KlinePanel from '../components/kline/KlinePanel';

function Kline() {
  return (
    <MainLayout>
      <KlinePanel />
    </MainLayout>
  );
}

export default connect()(Kline);
