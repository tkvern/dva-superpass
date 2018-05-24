// import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { query, store, destory, update, editOpen, currencyDetail } from '../services/messageSubscription';
import { getLocalStorage, setLocalStorage } from '../utils/helper';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'messageSubscription',
  state: {
    list: [],
    current: {
      created_at: "2018-05-21 20:45:21",
      currency: "btm", custom_price_breakthrough: null,
      id: 8,
      is_open: 1,
      large_fluctuation_detection: '{ "percent": "1", "time": "1" }',
      news_send: 1,
      pressure_level_breakthrough: 1,
      reminding_time: "15",
      trading_strategy_trading_point: null,
      updated_at: "2018-05-21 20:47:41",
      user_id: 1
    },
    currency_detail: {}
  },
  reducers: {
    showEdit(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    destorySuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(item => item.id !== id);
      return { ...state, list: newList, loading: false };
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      const { data } = yield call(query);
      if (data && data.err_code === 0) {
        setLocalStorage('message_subscriptions', data.list);
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
          },
        });
      }
    },
    * store({ payload }, { call, put }) {
      const { data } = yield call(store, payload);
      if (data && data.err_code === 0) {
        yield localStorage.removeItem('message_subscriptions');
        yield put(routerRedux.push('/app/message_subscription'))
        Toast.success("创建成功", 2);
      } else {
        Toast.fail(`创建失败! ${data.err_msg}`);
      }
    },
    * update({ payload }, { call, put }) {
      const { data } = yield call(update, payload);
      if (data && data.err_code === 0) {
        yield localStorage.removeItem('message_subscriptions');
        yield put(routerRedux.push('/app/message_subscription'))
        Toast.success("修改成功", 2);
      } else {
        Toast.fail(`修改失败! ${data.err_msg}`);
      }
    },
    * destory({ payload }, { call, put }) {
      const { data } = yield call(destory, payload);
      if (data && data.err_code === 0) {
        yield localStorage.removeItem('message_subscriptions');
        yield put({
          type: 'query'
        });
        Toast.success('删除成功!');
      } else {
        Toast.fail(`删除失败! ${data.err_msg}`);
      }
    },
    * editOpen({ payload }, { call, put }) {
      const { data } = yield call(editOpen, payload);
      if (data && data.err_code === 0) {
        yield localStorage.removeItem('message_subscriptions');
        yield put({
          type: 'query',
        });
        Toast.success('操作成功!');
      } else {
        Toast.fail(`操作失败! ${data.err_msg}`);
      }
    },
    * checkCache({ payload }, { select, call, put }) {
      const message_subscriptions = getLocalStorage('message_subscriptions');
      if (message_subscriptions) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: message_subscriptions,
          }
        });
      } else {
        yield put({
          type: 'query',
        });
      }
    },
    * queryCurrenyDetails({ payload }, { select, call, put }) {
      const { data } = yield call(currencyDetail);
      if (data && data.err_code === 0) {
        // setLocalStorage('message_subscriptions', data.list);
        yield put({
          type: 'querySuccess',
          payload: {
            currency_detail: data.currency_detail,
          },
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/app/message_subscription').exec(location.pathname);
        if (match) {
          dispatch({
            type: 'checkCache',
          });
        }
      });
    },
  },
}
