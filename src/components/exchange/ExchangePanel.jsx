import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import { Radio } from 'antd';
import style from './ExchangePanel.less';
import Numeral from 'numeral';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';

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
      magnitude: '1%',
      expected: '0.00',
      maxPrice: this.props.user.balance,
      hasPriceError: false,
      ticker_price: this.props.ticker_price,
      ticker_percent: this.props.ticker_percent,
      ticker_change: this.props.ticker_change,
      ticker_direction: this.props.ticker_direction,
      cnyusd: this.props.cnyusd
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
      that.setState({
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p']
      })
      setLocalStorage('ticker', {
        ...ticker_cache,
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p']
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
      case "1%":
        expected = price * odds * 0.01;
        break;
      case "2%":
        expected = price * odds * 0.02;
        break;
      case "5%":
        expected = price * odds * 0.05;
        break;
      case "4h":
        expected = price * odds * 0.01;
        break;
      case "10h":
        expected = price * odds * 0.01;
        break;
      case "24h":
        expected = price * odds * 0.01;
        break;
      default: ;
    }
    return this.setState({ expected: Numeral(expected).format('0,0.00') });
  }

  appendEmbedScript = (onload) => {
    const script = document.createElement('script');
    script.id = 'embed-widget-tickers-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.innerText = JSON.stringify(onload);
    document.getElementsByClassName('tradingview-widget-container__widget')[0].appendChild(script);
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
                      <div className={`${style.tickerItemBody} ${style[this.state.ticker_direction]}`}>
                        <span className={style.tickerItemChangeDirection}>
                          {this.state.ticker_direction === 'up' ? '↑' : '↓'}
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
                <RadioButton value="100">100</RadioButton>
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
              }} defaultValue="1%">
                <Radio value="1%">1%</Radio>
                <Radio value="2%">2%</Radio>
                <Radio value="5%">5%</Radio>
                <br />
                <Radio value="4h">4小时</Radio>
                <Radio value="10h">10小时</Radio>
                <Radio value="24h">24小时</Radio>
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
            <div className={`${style.formItem} ${style.antRow}`}>
              <Button className="am-green" type="default" inline>买涨</Button>
              <Button className="am-red" type="default" inline>买跌</Button>
            </div>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>
        <WhiteSpace size="md" />
        <div className={style.white}>
          <WingBlank>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <h3>当前订单</h3>
            </div>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default connect()(ExchangePanel);
