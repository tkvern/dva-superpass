import React, { Component } from 'react';
import { connect } from 'dva';
import { NoticeBar } from 'antd-mobile';

class KlinePanel extends Component {
  render() {
    return (
      <div>
        <NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
          Tip:横屏显示更多信息
        </NoticeBar>
      </div>
    );
  }
}

export default connect()(KlinePanel);
