import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { WhiteSpace, WingBlank, Button, Switch, Toast } from 'antd-mobile';
import { Select, Checkbox, Row, Col, Form } from 'antd';
import style from './MessageSubscriptionCreate.less';
import { createForm } from 'rc-form';

const Option = Select.Option;

const optionMaps = [
  { "text": "ABT", "value": "abt" }, { "text": "ACT", "value": "act" }, { "text": "ADA", "value": "ada" }, { "text": "ADX", "value": "adx" }, { "text": "AIDOC", "value": "aidoc" }, { "text": "APPC", "value": "appc" }, { "text": "AST", "value": "ast" }, { "text": "BAT", "value": "bat" }, { "text": "BCH", "value": "bch" }, { "text": "BFT", "value": "bft" }, { "text": "BLZ", "value": "blz" }, { "text": "BTC", "value": "btc" }, { "text": "BTM", "value": "btm" }, { "text": "BTS", "value": "bts" }, { "text": "CHAT", "value": "chat" }, { "text": "CMT", "value": "cmt" }, { "text": "CTXC", "value": "ctxc" }, { "text": "CVC", "value": "cvc" }, { "text": "DASH", "value": "dash" }, { "text": "DAT", "value": "dat" }, { "text": "DBC", "value": "dbc" }, { "text": "DGD", "value": "dgd" }, { "text": "DTA", "value": "dta" }, { "text": "EDU", "value": "edu" }, { "text": "EKO", "value": "eko" }, { "text": "ELA", "value": "ela" }, { "text": "ELF", "value": "elf" }, { "text": "ENG", "value": "eng" }, { "text": "EOS", "value": "eos" }, { "text": "ETC", "value": "etc" }, { "text": "ETH", "value": "eth" }, { "text": "EVX", "value": "evx" }, { "text": "GAS", "value": "gas" }, { "text": "GNT", "value": "gnt" }, { "text": "GNX", "value": "gnx" }, { "text": "HSR", "value": "hsr" }, { "text": "HT", "value": "ht" }, { "text": "ICX", "value": "icx" }, { "text": "IOST", "value": "iost" }, { "text": "ITC", "value": "itc" }, { "text": "KNC", "value": "knc" }, { "text": "LET", "value": "let" }, { "text": "LINK", "value": "link" }, { "text": "LSK", "value": "lsk" }, { "text": "LTC", "value": "ltc" }, { "text": "LUN", "value": "lun" }, { "text": "MANA", "value": "mana" }, { "text": "MCO", "value": "mco" }, { "text": "MDS", "value": "mds" }, { "text": "MEET", "value": "meet" }, { "text": "MTL", "value": "mtl" }, { "text": "MTN", "value": "mtn" }, { "text": "MTX", "value": "mtx" }, { "text": "NAS", "value": "nas" }, { "text": "NEO", "value": "neo" }, { "text": "OCN", "value": "ocn" }, { "text": "OMG", "value": "omg" }, { "text": "ONT", "value": "ont" }, { "text": "OST", "value": "ost" }, { "text": "PAY", "value": "pay" }, { "text": "POWR", "value": "powr" }, { "text": "PROPY", "value": "propy" }, { "text": "QASH", "value": "qash" }, { "text": "QSP", "value": "qsp" }, { "text": "QTUM", "value": "qtum" }, { "text": "QUN", "value": "qun" }, { "text": "RCN", "value": "rcn" }, { "text": "RDN", "value": "rdn" }, { "text": "REQ", "value": "req" }, { "text": "RPX", "value": "rpx" }, { "text": "RUFF", "value": "ruff" }, { "text": "SALT", "value": "salt" }, { "text": "SNC", "value": "snc" }, { "text": "SNT", "value": "snt" }, { "text": "SOC", "value": "soc" }, { "text": "SRN", "value": "srn" }, { "text": "STEEM", "value": "steem" }, { "text": "STK", "value": "stk" }, { "text": "STORJ", "value": "storj" }, { "text": "SWFTC", "value": "swftc" }, { "text": "THETA", "value": "theta" }, { "text": "TNB", "value": "tnb" }, { "text": "TNT", "value": "tnt" }, { "text": "TOPC", "value": "topc" }, { "text": "TRX", "value": "trx" }, { "text": "UTK", "value": "utk" }, { "text": "VEN", "value": "ven" }, { "text": "WAN", "value": "wan" }, { "text": "WAX", "value": "wax" }, { "text": "WICC", "value": "wicc" }, { "text": "WPR", "value": "wpr" }, { "text": "XEM", "value": "xem" }, { "text": "XRP", "value": "xrp" }, { "text": "YEE", "value": "yee" }, { "text": "ZEC", "value": "zec" }, { "text": "ZIL", "value": "zil" }, { "text": "ZLA", "value": "zla" }, { "text": "ZRX", "value": "zrx" }
];
class MessageSubscriptionCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const test = this.props.form.getFieldsValue();
        console.log(test);
      } else {
        Toast.fail('请填写完整的订阅信息', 1);
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldProps } = form;
    const options = [];
    optionMaps.forEach(option => {
      return options.push(<Option key={option.text} value={option.value}>{option.text}</Option>)
    });
    return (
      <div className={style.content}>

        <div className="am-list-header">
          <span style={{ fontSize: '13px' }}>Tip:请仔细填写订阅内容，能为您及时推送资讯</span>
        </div>
        <div className={style.white}>
          <Form>
            <WingBlank>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="币种">币种</label>
                </div>
                {getFieldDecorator('currency', {
                  rules: [
                    { required: true, message: '请选中币种' }
                  ]
                })(
                  <Select
                    size="large"
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="请选择或输入币种关键字"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {options}
                  </Select>
                )}
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="定时播报频率">定时播报频率</label>
                </div>
                {getFieldDecorator('reminding_time', {
                  rules: [
                    { required: true, message: '请选择频率' }
                  ]
                })(
                  <Select
                    size='large' placeholder="请选择频率" style={{ width: '100%' }}>
                    <Option value="5">5min</Option>
                    <Option value="15">15min</Option>
                    <Option value="30">30min</Option>
                    <Option value="60">60min</Option>
                  </Select>
                )}
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="短期大额波动提醒">短期大额波动提醒</label>
                </div>
                {getFieldDecorator('large_fluctuation_detection', {
                  rules: [
                    { required: true, message: '请选择幅度' }
                  ]
                })(
                  <Select
                    size="large" placeholder="请选择幅度" style={{ width: '100%' }}>
                    <Option value="1">5%(5min)</Option>
                    <Option value="2">10%(5min)</Option>
                    <Option value="3">5%(30min)</Option>
                    <Option value="4">10%(30min)</Option>
                  </Select>
                )}
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="自定义价格突破提醒">自定义价格突破提醒(选填)</label>
                </div>
                {getFieldDecorator('custom_price_breakthrough')(
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="请输入价格"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                  </Select>
                )}
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="交易策略交易点">交易策略交易点(选填)</label>
                </div>
                {getFieldDecorator('trading_strategy_trading_point')(
                  <Checkbox.Group
                    className={style.trading} style={{ width: '100%' }}>
                    <Row>
                      <Col span={12}><Checkbox value="1">EMA交叉平均</Checkbox></Col>
                      <Col span={12}><Checkbox value="2">SMA交叉平均</Checkbox></Col>
                      <Col span={12}><Checkbox value="3">MACD策略</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="压力位突破提醒">压力位突破提醒</label>
                </div>
                <Switch
                  {...getFieldProps('pressure_level_breakthrough', {
                    initialValue: true,
                    valuePropName: 'checked',
                  })}
                />
              </div>
              <WhiteSpace size="xl" />
              <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                <Button
                  className="am-green"
                  type="submit"
                  onClick={this.onSubmit}
                  inline
                  disabled={this.state.disabled}
                >保存</Button>
              </div>
              <WhiteSpace size="xl" />
            </WingBlank>
          </Form>
        </div>

        <WhiteSpace size="xl" />
      </div>
    );
  }
}


export default connect()(createForm()(MessageSubscriptionCreate));
