import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';

function User() {
  return (
    <MainLayout>
      <h1>个人中心</h1>
    </MainLayout>
  );
}

export default connect()(User);
