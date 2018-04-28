import React, { Component } from 'react';
// import { Link } from 'dva/router';
import { connect } from 'dva';
import style from './ExchangePanel.less';
import styleo from './ExchangeOrderPanel.less';
import { WingBlank, WhiteSpace, Flex, Toast } from 'antd-mobile';
import { Divider } from 'antd';
import moment from 'moment';
import Numeral from 'numeral';
import ExchangeResult from './ExchangeResult';

class ExchangeOrderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.currentOrders,
      status: 1,
      ticker_price: this.props.ticker_price
    }
  }
  componentDidMount = () => {
    // this.props.dispatch({
    //   type: 'exchange/currentOrders',
    //   payload: {
    //     user_id: this.props.user.id,
    //     status: this.state.status
    //   }
    // });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ticker_price: nextProps.ticker_price,
      orders: nextProps.currentOrders
    });
  }
  realtimeResult({ direction, magnitude, odds, rate, old_ticker_price, ticker_price, price }) {
    let result = 0;
    magnitude = parseInt(magnitude, 10);
    if (magnitude === 1 || magnitude === 2 || magnitude === 5) {
      result = ((ticker_price - old_ticker_price) / old_ticker_price) * odds * price;
    } else if (magnitude === 4 || magnitude === 10 || magnitude === 24) {
      result = (ticker_price - old_ticker_price) * odds * rate * ((price / rate) / old_ticker_price);
    }
    if (direction === 'down') {
      result = -result;
    }
    return {
      price: Numeral(result).format('0,0.00'),
      dirct: result >= 0 ? true : false
    };
  }
  getMagnitude(magnitude) {
    let str = '';
    switch (magnitude) {
      case "1":
        str = '1%'
        break;
      case "2":
        str = '2%'
        break;
      case "5":
        str = '5%'
        break;
      case "4":
        str = '4小时'
        break;
      case "10":
        str = '10小时'
        break;
      case "24":
        str = '24小时'
        break;
      default: ;
    }
    return str;
  }
  render() {
    return (
      <div>
        <WhiteSpace size="xl" />
        <WingBlank>
          <div className={`${style.formItem} ${style.antRow}`}>
            <Flex style={{ alignItems: 'baseline' }}>
              <Flex.Item>
                <h2>当前订单</h2>
              </Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}>
                {/*<Link to="/app/order">全部</Link>*/}
                <span onClick={() => { Toast.info("正在施工！", 1) }}>全部</span>
              </Flex.Item>
            </Flex>
          </div>
        </WingBlank>
        {this.state.orders.map((order) => (
          <div key={order.id}>
            <WingBlank>
              <div className={`${style.formItem} ${style.antRow}`}>
                <Flex>
                  <Flex.Item className={styleo.direction}>
                    <div className={styleo.leftBody}>
                      {
                        order.direction === 'up' ?
                          (<span className={styleo.dircup}>买涨</span>) :
                          (<span className={styleo.dircdown}>买跌</span>)
                      }
                    </div>
                  </Flex.Item>
                  <Flex.Item className={styleo.state}>
                    <div className={styleo.rightBody}>
                      <span className={styleo.text}>未结算</span>
                    </div>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="md" />
                <Flex>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexFirst}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>时间</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <span className={styleo.value}>{moment(order.updated_at).format('HH:mm DD/MM')}</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexSecend}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>幅度</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <span className={styleo.value}>{this.getMagnitude(order.magnitude.toString())}</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexLast}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>赔率(倍)</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <span className={styleo.value}>{order.odds}</span>
                    </div>
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="sm" />
                <Flex>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexFirst}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>价格(USDT)</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <span className={styleo.value}>{Numeral(order.ticker_price).format('0,0.00')}</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexSecend}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>金额(CNY)</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <span className={styleo.value}>{Numeral(order.price).format('0,0.00')}</span>
                    </div>
                  </Flex.Item>
                  <Flex.Item className={`${styleo.flexItem} ${styleo.flexLast}`}>
                    <div className={styleo.itemTitle}>
                      <span className={styleo.title}>结果(CNY)</span>
                    </div>
                    <div className={styleo.itemValue}>
                      <ExchangeResult result={
                        this.realtimeResult({
                          direction: order.direction,
                          magnitude: order.magnitude,
                          odds: order.odds,
                          rate: order.rate,
                          old_ticker_price: order.ticker_price,
                          ticker_price: this.state.ticker_price,
                          price: order.price
                        })}
                      />
                    </div>
                  </Flex.Item>
                </Flex>
              </div>
            </WingBlank>
            <Divider className="divider" />
          </div>
        ))}
        <WhiteSpace size="xl" />
      </div>
    );
  }
}

export default connect()(ExchangeOrderPanel);
