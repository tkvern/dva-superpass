import { parse } from 'qs';
import { rate, currentOrders } from '../services/exchange';
import { setLocalStorage } from '../utils/helper';

export default {
  namespace: 'exchange',
  state: {
    ticker_price: 0,
    ticker_percent: 0.00,
    ticker_change: 0,
    ticker_direction: '',
    ticker_24direction: '',
    cnyusd: 0,
    currentOrders: [],
  },
  reducers: {
    updateTicker(state, action) {
      return { ...state, ...action.payload };
    },
    updateCnyusd(state, action) {
      return { ...state, ...action.payload };
    },
    updateCurrenrOrders(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    * rate({ payload }, { call, put }) {
      const { data } = yield call(rate);
      if (data && data.rates) {
        setLocalStorage('rates', data.rates);
        yield put({
          type: 'updateCnyusd',
          payload: {
            cnyusd: data.rates['CNY'],
          }
        })
      }
    },
    * currentOrders({ payload }, { call, put }) {
      const { data } = yield call(currentOrders, parse(payload));
      if (data && data.success) {
        setLocalStorage('currentOrders', data.data);
        yield put({
          type: 'updateCurrenrOrders',
          payload: {
            currentOrders: data.data,
          }
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('exchange')) {
          // dispatch({
          //   type: 'checkCache',
          // });
        }
      });
    },
  },
}
