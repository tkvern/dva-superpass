import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { List, ListView } from 'antd-mobile';
import style from './BalancePanel.less';
import { getScoresType } from '../../utils/helper';

const Item = List.Item;
const Brief = Item.Brief;
let pageIndex = 0

const data = [
  {
    "id": 4,
    "is_settlement": "2",
    "type": "1",
    "value": 10000,
    "user_id": 4,
    "created_at": "2018-05-08 16:18:23",
    "updated_at": "2018-05-08 16:18:27"
  },
  {
    "id": 5,
    "is_settlement": "2",
    "type": "4",
    "value": 10,
    "user_id": 4,
    "created_at": "2018-05-08 16:43:14",
    "updated_at": "2018-05-08 16:43:14"
  },
  {
    "id": 6,
    "is_settlement": "2",
    "type": "2",
    "value": 10000,
    "user_id": 4,
    "created_at": "2018-05-08 16:18:23",
    "updated_at": "2018-05-08 16:18:27"
  },
  {
    "id": 7,
    "is_settlement": "2",
    "type": "3",
    "value": 10,
    "user_id": 4,
    "created_at": "2018-05-08 16:43:14",
    "updated_at": "2018-05-08 16:43:14"
  },
  {
    "id": 8,
    "is_settlement": "2",
    "type": "5",
    "value": 10000,
    "user_id": 4,
    "created_at": "2018-05-08 16:18:23",
    "updated_at": "2018-05-08 16:18:27"
  },
  {
    "id": 9,
    "is_settlement": "2",
    "type": "4",
    "value": 10,
    "user_id": 4,
    "created_at": "2018-05-08 16:43:14",
    "updated_at": "2018-05-08 16:43:14"
  }
];

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class BalancePanel extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      data: [],
      dataSource,
      isLoading: true,
      useBodyScroll: false,
    }
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    // setTimeout(() => this.setState({
    //   height: hei,
    //   data: genData(),
    // }), 0);

    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 1000);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    // console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      const { text, direction } = getScoresType(obj.type);
      return (
        <Item key={rowID} multipleLine extra={
          <div className={`${style.extra} ${direction ? 'green' : ''}`}>
            {direction ? '+' : '-'}{obj.value}
          </div>
        }>
          {text}<Brief>{obj.created_at}</Brief>
        </Item>
      );
    }
    return (
      <div className={style.content}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '加载完成'}
          </div>)}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={10}
          onScroll={() => { }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}


export default connect()(BalancePanel);
