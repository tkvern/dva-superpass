import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import { Radio } from 'antd';
import style from './ExchangePanel.less';
import Numeral from 'numeral';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ExchangePanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price,
      odds: 20,
      magnitude: '1%',
      expected: '0.00',
      maxPrice: 10000,
      hasPriceError: false
    }
  }

  componentDidMount = () => {
    this.appendEmbedScript({
      'symbols': [
        {
          'title': 'BTC/USD',
          'proName': 'BITFINEX:BTCUSD'
        },
      ],
      'locale': 'zh_CN'
    });
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
  };

  render() {
    return (
      <div>
        <div className={style.white}>
          <WingBlank>
            {/*<div className={style.subTitle}>交易-BTC</div>*/}
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '72px' }}>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
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
