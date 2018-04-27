import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import { Radio } from 'antd';
import style from './ExchangePanel.less';
import Numeral from 'numeral';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';
import ExchangeOrderPanel from './ExchangeOrderPanel';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
let aggTradeSocket;
let tickerSocket;
class ExchangePanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      odds: 20,
      magnitude: '1',
      expected: '0.00',
      maxPrice: this.props.user.balance,
      hasPriceError: false,
      ticker_price: this.props.ticker_price,
      ticker_percent: this.props.ticker_percent,
      ticker_change: this.props.ticker_change,
      ticker_direction: this.props.ticker_direction,
      ticker_24direction: this.props.ticker_24direction,
      cnyusd: this.props.cnyusd,
      disabled: !!this.props.disabled,
      user: this.props.user,
      currentOrders: this.props.currentOrders
    }
  }

  componentDidMount = () => {
    const that = this;
    aggTradeSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
    tickerSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    aggTradeSocket.onmessage = function (evt) {
      const ticker_cache = getLocalStorage('ticker');
      const received_msg = JSON.parse(evt.data);
      const diff = received_msg['p'] - that.state.ticker_price;
      let direction = '';
      if (diff > 0) {
        direction = 'up';
      } else {
        direction = 'down'
      };
      that.setState({
        ticker_price: received_msg['p'],
        ticker_direction: direction
      })
      setLocalStorage('ticker', {
        ...ticker_cache,
        ticker_price: received_msg['p'],
        ticker_direction: direction
      });
    };
    tickerSocket.onmessage = function (evt) {
      const ticker_cache = getLocalStorage('ticker');
      const received_msg = JSON.parse(evt.data);
      let ticker_24direction = '';
      if (received_msg['P'] >= 0) {
        ticker_24direction = 'up'
      } else {
        ticker_24direction = 'down'
      };
      that.setState({
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p'],
        ticker_24direction: ticker_24direction
      })
      setLocalStorage('ticker', {
        ...ticker_cache,
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p'],
        ticker_24direction: ticker_24direction
      });
    };
  }
  componentWillUnmount = () => {
    aggTradeSocket.close();
    tickerSocket.close();
  }

  sumExpected(price, odds, magnitude) {
    let expected;
    switch (magnitude) {
      case "1":
        expected = price * odds * 0.01;
        break;
      case "2":
        expected = price * odds * 0.02;
        break;
      case "5":
        expected = price * odds * 0.05;
        break;
      case "4":
        expected = price * odds * 0.01;
        break;
      case "10":
        expected = price * odds * 0.01;
        break;
      case "24":
        expected = price * odds * 0.01;
        break;
      default: ;
    }
    return this.setState({ expected: Numeral(expected).format('0,0.00') });
  }

  onSubmit = (direction) => {
    Toast.loading('Loading...', 2);
    this.setState({
      disabled: true
    })
    const { price, odds, magnitude, maxPrice, cnyusd, ticker_price } = this.state;
    let user = this.state.user;
    if (price > maxPrice || price < 100) {
      this.setState({
        disabled: false,
      });
      return Toast.fail((<span>请输入正确的金额<br />最低100 CNY</span>), 1);
    }
    this.props.dispatch({
      type: 'exchange/create',
      payload: {
        price: price,
        odds: odds,
        magnitude: magnitude,
        rate: cnyusd,
        ticker_price: ticker_price,
        user_id: user.id,
        direction: direction
      }
    })
    user.balance = user.balance - price;
    setLocalStorage('user', user);
    setTimeout(() => {
      clearTimeout(this);
      Toast.success("下单成功！", 1);
      const currentOrders = getLocalStorage('currentOrders');
      this.setState({
        disabled: false,
        price: 0,
        odds: 20,
        magnitude: '1',
        expected: '0.00',
        currentOrders: currentOrders,
        user: user,
        maxPrice: user.balance
      })
    }, 2000);

  }

  render() {
    return (
      <div>
        <div className={style.white}>
          <WingBlank>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
              </div>
              <div className={style.embedWrapperBody}>
                <div className={style.tickerContainer}>
                  <div className={style.tickerRow}>
                    <div className={style.tickerItem}>
                      <div className={style.tickerItemHead}>
                        <span className={style.tickerItemTitle}>BTC/USDT</span>
                        <span
                          className={`${style.tickerItemLast} ${this.state.ticker_direction === 'up' ? style.growing : style.falling}`}>
                          ${Numeral(this.state.ticker_price).format('0,0.00')} ≈ ¥{Numeral(this.state.ticker_price * this.state.cnyusd).format('0,0.00')}
                        </span>
                      </div>
                      <div className={`${style.tickerItemBody} ${style[this.state.ticker_24direction]}`}>
                        <span className={style.tickerItemChangeDirection}>
                          {this.state.ticker_24direction === 'up' ? '↑' : '↓'}
                        </span>
                        <span className={style.tickerItemChangePercent}>{Numeral(this.state.ticker_percent).format('0.00')}%</span>
                        <span className={style.tickerChange}>{Numeral(this.state.ticker_change).format('0,0.00')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>
        <WhiteSpace size="md" />
        <div className={style.white}>
          <WingBlank>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className={style.itemLabel}>
                <label title="账户余额">账户余额: {Numeral(this.state.maxPrice).format('0,0.00')} CNY</label>
              </div>
              <InputItem
                name="price"
                type="money"
                placeholder="0"
                min={1}
                clear
                error={this.state.hasPriceError}
                onErrorClick={() => {
                  if (this.state.hasPriceError) {
                    Toast.info('可用金额不足!');
                  }
                }}
                extra="CNY"
                value={this.state.price}
                onChange={(price) => {
                  let cprice = Numeral(price).value() || 0;
                  cprice > this.state.maxPrice ?
                    this.setState({ hasPriceError: true }) : this.setState({ hasPriceError: false });
                  this.setState({ price: cprice.toString() });
                  this.sumExpected(cprice, this.state.odds, this.state.magnitude);
                }}
              >金额</InputItem>
              <WhiteSpace size="xs" />
              <div className={style.itemTip}>
                <label title="usdt">≈ ${Numeral(this.state.price / this.state.cnyusd).format('0,0.00')}</label>
              </div>
            </div>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className={style.itemLabel}>
                <label title="赔率(倍)">赔率(倍)</label>
              </div>
              <RadioGroup name="odds" className={style.odds} onChange={(e) => {
                this.setState({ odds: e.target.value });
                this.sumExpected(this.state.price, e.target.value, this.state.magnitude);
              }} defaultValue="20" size="large">
                <RadioButton value="10">10</RadioButton>
                <RadioButton value="20">20</RadioButton>
                <RadioButton value="50">50</RadioButton>
              </RadioGroup>
              <WhiteSpace size="xs" />
              <div className={style.itemTip}>
                <label title="爆仓率">爆仓率:{100 / this.state.odds}%</label>
              </div>
            </div>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className={style.itemLabel}>
                <label title="幅度">幅度</label>
              </div>
              <RadioGroup name="magnitude" onChange={(e) => {
                this.setState({ magnitude: e.target.value });
                this.sumExpected(this.state.price, this.state.odds, e.target.value);
              }} defaultValue="1">
                <Radio value="1">1%</Radio>
                <Radio value="2">2%</Radio>
                <Radio value="5">5%</Radio>
                <br />
                <Radio value="4">4小时</Radio>
                <Radio value="10">10小时</Radio>
                <Radio value="24">24小时</Radio>
              </RadioGroup>
            </div>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className={style.itemLabel}>
                <label title="预期收益">预期收益(包含手续费)</label>
                <p className={style.priceIncome}>≈{this.state.expected}</p>
              </div>
              <div className={style.itemTip}>
                <label title="tip">小时订单为1%收益预期，以实际价格为准</label>
              </div>
            </div>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
              <Button
                className="am-green"
                type="default"
                onClick={() => {
                  this.onSubmit('up');
                }}
                inline
                disabled={this.state.disabled}
              >买涨</Button>
              <Button
                className="am-red"
                type="default"
                onClick={() => {
                  this.onSubmit('down');
                }}
                inline
                disabled={this.state.disabled}
              >买跌</Button>
              <div className={style.itemTip}>
                <label title="tip" style={{ color: '#9db2bd' }}>AI推荐指数 <br /><span className={style.zh}>涨:13</span>   <span className={style.zo}>中立:10</span>   <span className={style.di}>跌:1</span></label>
              </div>
            </div>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>
        <WhiteSpace size="md" />
        <div className={style.white}>
          <ExchangeOrderPanel
            user={this.state.user}
            currentOrders={this.state.currentOrders}
            ticker_price={this.state.ticker_price}
          />
        </div>
      </div>
    );
  }
}

export default connect()(ExchangePanel);
