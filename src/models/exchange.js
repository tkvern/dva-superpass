import { parse } from 'qs';
import { rate, currentOrders, create } from '../services/exchange';
import { getLocalStorage, setLocalStorage } from '../utils/helper';

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
    * checkCache({ payload }, { select, call, put }) {
      const ticker = getLocalStorage('ticker');
      const rates = getLocalStorage('rates');
      const corders = getLocalStorage('currentOrders');
      const user = getLocalStorage('user');
      if (ticker) {
        yield put({
          type: 'updateTicker',
          payload: {
            ticker_price: ticker.ticker_price,
            ticker_percent: ticker.ticker_percent,
            ticker_change: ticker.ticker_change,
            ticker_direction: ticker.ticker_direction
          }
        })
      }
      if (rates) {
        yield put({
          type: 'updateTicker',
          payload: {
            cnyusd: rates['CNY'],
          }
        })
      } else {
        yield put({
          type: 'rate'
        })
      }
      if (corders) {
        yield put({
          type: 'updateCurrenrOrders',
          payload: {
            currentOrders: corders,
          }
        })
      } else {
        yield put({
          type: 'currentOrders',
          payload: {
            user_id: user.id,
            status: 1
          }
        })
      }
    },
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
    * create({ payload }, { call, put }) {
      const user = getLocalStorage('user');
      const { data } = yield call(create, parse(payload))
      if (data && data.success) {
        yield put({
          type: 'currentOrders',
          payload: {
            user_id: user.id,
            status: 1
          }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('exchange')) {
          dispatch({
            type: 'checkCache',
          });
        }
      });
    },
  },
}
