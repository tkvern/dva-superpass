import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, Button, Toast, WhiteSpace, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import config from '../../config';

const Item = List.Item;
class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      loading: false,
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { account, password } = this.props.form.getFieldsValue();
        this.props.onSubmit({
          account: account,
          password: password
        })
      } else {
        Toast.fail('请填写账号和密码', 1);
      }
    });
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('账号为注册时的邮箱地址'));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <form>
        <List
          renderHeader={() => '欢迎登录 SuperPass'}
          renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
        >
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '账户不能为空' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            type="text"
            placeholder="请输入邮箱或账户"
          >账号</InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                { required: true, message: '密码不能为空' }
              ]
            })}
            error={!!getFieldError('password')}
            placeholder="请输入密码"
            type="password">密码</InputItem>
          <Item>
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={() => {
                this.onSubmit()
              }}>登录</Button>
            <WhiteSpace size="xl" />
            <Flex>
              <Flex.Item><a href={`${config.host}/user/activate_email`}>未激活?</a></Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}><a href={`${config.host}/password/reset`}>忘记密码?</a></Flex.Item>
            </Flex>
            <WhiteSpace size="md" />
          </Item>
        </List>
      </form>
    );
  }
}

export default connect()(createForm()(LoginPanel));
